import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link href={`/products/${product._id}`} className="product-card group">
      <div className="product-card_img-container relative overflow-hidden rounded-lg">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="product-card_img transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <h3 className="product-title text-lg font-semibold group-hover:text-primary">
          {product.title}
        </h3>

        <div className="flex justify-between text-gray-600">
          <p className="text-sm capitalize">{product.category}</p>

          <p className="text-sm font-semibold">
            {product.currency}
            <span className="ml-1">{product.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
