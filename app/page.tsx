import HeroCarousel from "@/components/HeroCarousel";
import Searchbar from "@/components/Searchbar";
import Image from "next/image";
import { getUserProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";

const Home = async ({ searchParams }) => {
  const { userId, username } = searchParams;

  // Fetch products specific to the logged-in user
  const userProducts = await getUserProducts(userId);

  return (
    <>
      <section className="flex items-center justify-center min-h-screen px-6 md:px-20 py-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex flex-col justify-center max-w-lg">
            <p className="small-text flex items-center">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
                className="ml-2"
              />
            </p>

            <h1 className="head-text mt-4">
              Unleash the Power of
              <span className="text-primary"> Deal Scout</span>
            </h1>

            <p className="mt-6 text-gray-700 leading-relaxed">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>

            <Searchbar />
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section px-6 md:px-20 py-16">
        <h2 className="section-text mb-8">Recent Searches by {username}</h2>

        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
