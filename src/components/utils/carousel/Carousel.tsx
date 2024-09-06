import { useMediaQuery } from "@mui/material";
import ProductCard from "../../cards/ProductCard";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsiveHero, responsiveTopLocation } from "./responsive";
import { QUERY_PRODUCTS_REFERENCES } from "@/graphql/productReference/queryProductsReferences";
import { useQuery } from "@apollo/client";

// const products = [
//   {
//     id: 1,
//     name: "Hannibal 94",
//     description: "Great product",
//     display: true,
//     brandName: "Salomon",
//     price: [50, 100, 120],
//     src: "/images/products/salomon1.png",
//   },
//   {
//     id: 1,
//     name: "Fischer PRO",
//     description: "Great product",
//     display: true,
//     brandName: "Fisher",
//     price: [50, 100, 120],
//     src: "/images/products/fischer2_mini.png",
//   },
//   {
//     id: 2,
//     name: "Hannibal 94",
//     description: "Great product",
//     display: true,
//     brandName: "Salomon",
//     price: [50, 100, 120],
//     src: "/images/fischer1.png",
//   },
//   {
//     id: 3,
//     name: "Hannibal 94",
//     description: "Great product",
//     display: true,
//     brandName: "Salomon",
//     price: [50, 100, 120],
//     src: "/images/fischer2_mini.png",
//   },
//   {
//     id: 4,
//     name: "Hannibal 94",
//     description: "Great product",
//     display: true,
//     brandName: "Salomon",
//     price: [50, 100, 120],
//     src: "/images/fischer2.png",
//   },
//   {
//     id: 5,
//     name: "Hannibal 94",
//     description: "Great product",
//     display: true,
//     brandName: "Salomon",
//     price: [50, 100, 120],
//     src: "/images/salomon1.png",
//   },
//   {
//     id: 6,
//     name: "Hannibal 94",
//     description: "Great product",
//     display: true,
//     brandName: "Salomon",
//     price: [50, 100, 120],
//     src: "/images/fischer1.png",
//   },
//   {
//     id: 7,
//     name: "Hannibal 94",
//     description: "Great product",
//     display: true,
//     brandName: "Salomon",
//     price: [50, 100, 120],
//     src: "/images/salomon1.png",
//   },
//   {
//     id: 8,
//     name: "Hannibal 94",
//     description: "Great product",
//     display: true,
//     brandName: "Salomon",
//     price: [50, 100, 120],
//     src: "/images/salomon1.png",
//   },
// ];

type CarouselProps = {
  type: string;
};

function Carousel({ type }: CarouselProps) {
  const { data } = useQuery(QUERY_PRODUCTS_REFERENCES);
  const products = data?.items || [];

  const matchSize800 = useMediaQuery("(max-width:800px)");

  const responsive =
    type === "TopLocations"
      ? responsiveTopLocation
      : type === "Hero"
        ? responsiveHero
        : {};

  const classNameCarousel =
    type === "Hero"
      ? " carousel-hero"
      : type === "TopLocations"
        ? " carousel-top-locations"
        : "";

  return (
    <MultiCarousel
      responsive={responsive}
      infinite
      showDots={false}
      partialVisible={type === "Hero" || matchSize800 ? true : false}
      keyBoardControl={true}
      containerClass={"carousel-container" + classNameCarousel}
    >
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </MultiCarousel>
  );
}

export default Carousel;
