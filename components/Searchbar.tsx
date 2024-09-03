"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

const isValidProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }

    if (
      hostname.includes("flipkart.com") ||
      hostname.includes("flipkart.") ||
      hostname.includes("flipkart")
    ) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidProductURL(searchPrompt)) {
      alert("Please provide a valid Amazon or Flipkart link");
      return;
    }

    try {
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(searchPrompt);
      if (product) {
        router.push(`/products/${product._id}`);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      alert(
        `Failed to scrape product: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col sm:flex-row gap-4 mt-12"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter Amazon or Flipkart product link"
        className="searchbar-input w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-0 border-2 border-black border-dashed"
      />

      <button
        type="submit"
        className="searchbar-btn flex items-center justify-center bg-primary text-white rounded-lg px-6 py-3 disabled:opacity-50"
        disabled={searchPrompt === "" || isLoading}
      >
        {isLoading ? (
          "Searching..."
        ) : (
          <>
            <FaSearch className="mr-2" /> Search
          </>
        )}
      </button>
    </form>
  );
};

export default Searchbar;
