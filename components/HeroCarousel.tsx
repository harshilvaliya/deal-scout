"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
  { imgUrl: "/assets/images/hero-1.svg", alt: "Smartwatch" },
  { imgUrl: "/assets/images/hero-2.svg", alt: "Bag" },
  { imgUrl: "/assets/images/hero-3.svg", alt: "Lamp" },
  { imgUrl: "/assets/images/hero-5.svg", alt: "Chair" },
];

const HeroCarousel = () => {
  return (
    <div className="relative">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
        dynamicHeight={false}
        showIndicators={false}
        className="hero-carousel"
      >
        {heroImages.map((image) => (
          <Image
            src={image.imgUrl}
            alt={image.alt}
            width={500}
            height={500}
            className="object-contain"
            key={image.alt}
          />
        ))}
      </Carousel>

      <Image
        src="assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className="hidden  xl:block absolute -left-[20%] -bottom-[8%] z-10"
      />
    </div>
  );
};

export default HeroCarousel;
