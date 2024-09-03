"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    return (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    );
  } catch (error) {
    return false;
  }
};

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidAmazonProductURL(searchPrompt))
      return alert("Please provide a valid Amazon link");

    try {
      setIsLoading(true);
      await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.error(error);
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
        placeholder="Enter Amazon product link"
        className="searchbar-input w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <button
        type="submit"
        className="searchbar-btn flex items-center justify-center bg-primary text-white rounded-lg px-6 py-3 disabled:opacity-50"
        disabled={searchPrompt === ""}
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
