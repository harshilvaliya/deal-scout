"use server";

import { scrapeAmazonProduct } from "./amazon";
import { scrapeFlipkartProduct } from "./flipkart";

export async function scrapeProduct(url: string) {
  if (url.includes("amazon")) {
    return scrapeAmazonProduct(url);
  } else if (url.includes("flipkart")) {
    return scrapeFlipkartProduct(url);
  }else if (url.includes("myntra")) {
    return scrapeFlipkartProduct(url);
  } else {
    throw new Error("Unsupported website");
  }
}
