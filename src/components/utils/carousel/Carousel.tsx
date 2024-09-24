import { useMediaQuery } from "@mui/material";
import ProductCard from "../../cards/ProductCard";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsiveHero, responsiveTopLocation } from "./responsive";
import { QUERY_PRODUCTS_REFERENCES } from "@/graphql/productReference/queryProductsReferences";
import { useQuery } from "@apollo/client";

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
    products.length > 0 && (
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
    )
  );
}

export default Carousel;
