"use server";

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDB();

    // Try to find an existing product first
    const existingProduct = await Product.findOne({ url: productUrl });

    if (existingProduct) {
      // If the product exists and was updated recently, return it without scraping
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      if (existingProduct.updatedAt > oneDayAgo) {
        console.log("Returning existing product without scraping");
        return existingProduct;
      }
    }

    // If the product doesn't exist or is outdated, try to scrape
    const scrapedProduct = await scrapeProduct(productUrl);

    if (!scrapedProduct) {
      // If scraping fails but we have an existing product, return the existing one
      if (existingProduct) {
        console.log("Scraping failed, returning existing product");
        return existingProduct;
      }
      throw new Error("Failed to scrape product and no existing product found");
    }

    let product = scrapedProduct;

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: productUrl },
      product,
      { upsert: true, new: true }
    );

    revalidatePath("/");
    return newProduct;
  } catch (error: any) {
    console.error("Error in scrapeAndStoreProduct:", error);
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}

// ... (rest of the file remains unchanged)
export async function getProductById(productId: string) {
  try {
    connectToDB();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();

    const products = await Product.find().sort({ createdAt: -1 });

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    connectToDB();

    const currentProduct = await Product.findById(productId);

    if (!currentProduct) return null;

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    })
      .sort({ createdAt: -1 })
      .limit(3);

    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserEmailToProduct(
  productId: string,
  userEmail: string
) {
  try {
    const product = await Product.findById(productId);

    if (!product) return;

    const userExists = product.users.some(
      (user: User) => user.email === userEmail
    );

    if (!userExists) {
      product.users.push({ email: userEmail });

      await product.save();

      const emailContent = await generateEmailBody(product, "WELCOME");

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}
