import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
};

const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);

  if (!product) redirect("/");

  const similarProducts = await getSimilarProducts(id);

  return (
    <div className="product-container py-12 px-6 lg:px-24">
      <div className="flex gap-16 flex-col xl:flex-row">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="mx-auto object-contain"
          />
        </div>

        <div className="flex-1 flex flex-col gap-8">
          <div className="flex justify-between items-start gap-5 flex-wrap">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold text-secondary">
                {product.title}
              </h1>

              <Link
                href={product.url}
                target="_blank"
                className="text-lg text-primary underline hover:text-secondary transition-colors"
              >
                Visit Product
              </Link>
            </div>

            {/* <div className="flex items-center gap-4">
              <div className="product-hearts flex items-center gap-2">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  width={20}
                  height={20}
                />
                <p className="text-lg font-semibold text-[#D46F77]">
                  {product.reviewsCount}
                </p>
              </div>

              <div className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Image
                  src="/assets/icons/bookmark.svg"
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>

              <div className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Image
                  src="/assets/icons/share.svg"
                  alt="share"
                  width={20}
                  height={20}
                />
              </div>
            </div> */}
          </div>

          <div className="product-info flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-4xl font-bold text-secondary">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              <p className="text-2xl text-gray-500             line-through">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* <div className="flex items-center gap-4">
                <div className="product-stars flex items-center gap-2">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                  />
                  <p className="text-lg font-semibold text-primary-orange">
                    {product.stars || "25"}
                  </p>
                </div>

                <div className="product-reviews flex items-center gap-2">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    width={16}
                    height={16}
                  />
                  <p className="text-lg font-semibold text-secondary">
                    {product.reviewsCount} Reviews
                  </p>
                </div>
              </div> */}

              <p className="text-md text-gray-600">
                <span className="text-primary-green font-semibold">93%</span> of
                buyers recommend this product.
              </p>
            </div>
          </div>

          <div className="my-7 flex flex-col gap-5">
            <div className="flex flex-wrap gap-5">
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
              />
              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${formatNumber(
                  product.averagePrice
                )}`}
              />
              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${formatNumber(
                  product.highestPrice
                )}`}
              />
              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${formatNumber(
                  product.lowestPrice
                )}`}
              />
            </div>
          </div>

          <Modal productId={id} />
        </div>
      </div>

      <div className="flex flex-col gap-12 mt-10">
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-semibold text-secondary">
            Product Description
          </h3>
          <div className="flex flex-col gap-4">
            {product?.description?.split("\n")}
          </div>
        </div>

        <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
          <Image
            src="/assets/icons/bag.svg"
            alt="check"
            width={22}
            height={22}
          />

          <Link href="/" className="text-base text-white">
            Buy Now
          </Link>
        </button>
      </div>

      {similarProducts && similarProducts.length > 0 && (
        <div className="py-14 flex flex-col gap-8 w-full">
          <h3 className="text-2xl font-semibold text-secondary">
            Recent Searches
          </h3>
          <div className="flex flex-wrap gap-8">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
