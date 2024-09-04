"use server";

import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../utils";

const MAX_RETRIES = 5;
const INITIAL_DELAY = 5000; // 5 seconds

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
];

const getRandomUserAgent = () =>
  USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];

const getJitterDelay = (baseDelay: number) => {
  const jitter = Math.random() * 0.3 * baseDelay;
  return baseDelay + jitter;
};

export async function scrapeFlipkartProduct(url: string) {
  if (!url) return;

  // BrightData proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const userAgent = getRandomUserAgent();
      const response = await axios.get(url, {
        ...options,
        headers: {
          "User-Agent": userAgent,
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          "Upgrade-Insecure-Requests": "1",
          "Cache-Control": "max-age=0",
        },
        timeout: 60000, // 60 seconds timeout
      });

      const $ = cheerio.load(response.data);

      const title = $("span.B_NuCI").text().trim();
      const currentPrice = extractPrice(
        $("div._30jeq3._16Jk6d"),
        $("div._30jeq3")
      );
      const originalPrice = extractPrice($("div._3I9_wc._2p6lqe"));

      const outOfStock =
        $("button._2KpZ6l._2U9uOA.ihZ75k._3v1-ww").length === 0;

      const images = $("img._396cs4._2amPTt._3qGmMb").attr("src") || "";

      const currency = extractCurrency($("div._30jeq3._16Jk6d"));
      const discountRate = $("div._3Ay6Sb._31Dcoz").text().replace(/[-%]/g, "");

      const description = $("div._1mXcCf.RmoJUa").text().trim();

      if (!title || !currentPrice) {
        throw new Error("Failed to extract essential product information");
      }

      const data = {
        url,
        currency: currency || "₹",
        image: images,
        title,
        currentPrice: Number(currentPrice) || Number(originalPrice),
        originalPrice: Number(originalPrice) || Number(currentPrice),
        priceHistory: [],
        discountRate: Number(discountRate),
        category: "category",
        reviewsCount: 100,
        stars: 4.5,
        isOutOfStock: outOfStock,
        description,
        lowestPrice: Number(currentPrice) || Number(originalPrice),
        highestPrice: Number(originalPrice) || Number(currentPrice),
        averagePrice: Number(currentPrice) || Number(originalPrice),
      };
      console.log(data);
      
      return data;
    } catch (error: any) {
      console.log(`Attempt ${retries + 1} failed: ${error.message}`);
      retries++;
      if (retries >= MAX_RETRIES) {
        throw new Error(
          `Failed to scrape Flipkart product after ${MAX_RETRIES} attempts: ${error.message}`
        );
      }
      const delay = getJitterDelay(INITIAL_DELAY * Math.pow(2, retries)); // Exponential backoff with jitter
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
