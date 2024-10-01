import { useMediaQuery } from "@mui/material";
import ProductCard from "../../cards/ProductCard";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  responsiveHero,
  responsiveTopLocation,
  responsiveTestimonials,
} from "./responsive";
import { QUERY_PRODUCTS_REFERENCES } from "@/graphql/productReference/queryProductsReferences";
import { useQuery } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import TestimonialCardPropsType from "@/types/TestimonialsTypes";
import CardsTestimonials from "@/components/cards/TestimonialsCard";

function responsiveObj(type: string) {
  if (type === "TopLocations") return responsiveTopLocation;
  else if (type === "Hero") return responsiveHero;
  else if (type === "Testimonials") return responsiveTestimonials;
}

function classPick(type: string) {
  if (type === "TopLocations") return " carousel-top-locations";
  else if (type === "Hero") return " carousel-hero";
  else if (type === "Testimonials") return " testimonials-carousel";
}

type CarouselProps = {
  type: string;
  testimonialCards?: TestimonialCardPropsType[];
};

function Carousel({ type, testimonialCards }: CarouselProps) {
  const carouselRef = useRef(null);
  const matchSize800 = useMediaQuery("(max-width:800px)");

  // Fetch products
  const { data } = useQuery(QUERY_PRODUCTS_REFERENCES);
  const products = type === "Testimonials" ? null : data?.items || [];

  // Responsive object for specyfic Carousel
  const responsive = responsiveObj(type);
  const classNameCarousel = classPick(type);

  // Turn off scroll page when swiping Carousel on mobile
  useEffect(() => {
    const carousel = carouselRef.current;

    let startX = 0;
    let startY = 0;
    let isHorizontal = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isHorizontal = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      if (!isHorizontal) {
        isHorizontal = Math.abs(dx) > Math.abs(dy);
      }

      if (isHorizontal) {
        e.preventDefault(); // Lock vertical scroll when swiping horizontally
      }
    };

    if (carousel) {
      carousel.addEventListener("touchstart", handleTouchStart);
      carousel.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("touchstart", handleTouchStart);
        carousel.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, []);

  return (
    <div ref={carouselRef}>
      <MultiCarousel
        responsive={responsive}
        infinite
        autoPlay={testimonialCards ? true : false}
        showDots={false}
        partialVisible={
          type === "Hero" || matchSize800
            ? true
            : false || testimonialCards
              ? true
              : false
        }
        keyBoardControl={true}
        containerClass={"carousel-container" + classNameCarousel}
      >
        {testimonialCards
          ? testimonialCards?.map((card) => (
              <CardsTestimonials card={card} key={card.id} />
            ))
          : products &&
            products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                ariaLabel={`Product: ${product.name}`} // Add ariaLabel
              />
            ))}
      </MultiCarousel>
    </div>
  );
}

export default Carousel;
