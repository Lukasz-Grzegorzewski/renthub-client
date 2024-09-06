import { Box, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { OrangeBtnWhiteHover } from "@/styles/MuiButtons";
import type TestimonialCardPropsType from "@/types/TestimonialsTypes";
import CardsTestimials from "@/components/cards/TestimonialsCard";

const testimonialCards: TestimonialCardPropsType[] = [
  {
    id: 1,
    author: "Jean Bertot",
    company: "L'agence",
    domain: "Agence de voyage",
    description: [
      "“J'ai loué des skis chez RentHub pour mon séjour à la montagne et j'ai été très satisfait du service.",
      "Le matériel était en excellent état et le personnel était très professionnel.",
      "Je n'hésiterai pas à faire appel à eux lors de mon prochain voyage.”",
    ],
  },
  {
    id: 2,
    author: "Sophie Martin",
    company: "Sport Extrême",
    domain: "Magasin de sport",
    description: [
      "“J'ai loué un snowboard pour une journée avec RentHub.",
      "Le processus de réservation était simple et rapide, et le matériel était de très bonne qualité.",
      "Je recommande vivement leurs services.”",
    ],
  },
  {
    id: 3,
    author: "Lucas Dubois",
    company: "Aventure Sportive",
    domain: "Club de randonnée",
    description: [
      "“RentHub propose une large gamme d'équipements de montagne à louer.",
      "J'ai loué des raquettes de neige pour une excursion en montagne et j'ai été très content du matériel et du service client.",
      "Le personnel était très accueillant et m'a donné de bons conseils pour choisir l'équipement adapté à mes besoins.”",
    ],
  },

  {
    id: 4,
    author: "Olivier FRETAY",
    company: "DG Code Rousseau",
    domain: "location del tel materile de sport",
    description: [
      "“Isdem diebus Apollinaris Domitiani gener, paulo ante agens palatii Caesaris curam, ad Mesopotamiam missusbus apollinarispaulo ante.”",
    ],
  },
];

function Testimonials() {
  const responsive = {
    varyLargeDesktop: {
      breakpoint: { max: 4000, min: 1500 },
      items: 3,
      partialVisibilityGutter: 80,
    },
    largeDesktop: {
      breakpoint: { max: 1499, min: 1200 },
      items: 2,
      partialVisibilityGutter: 80,
    },
    desktop: {
      breakpoint: { max: 1199, min: 801 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 800, min: 745 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 744, min: 650 },
      items: 1,
      partialVisibilityGutter: 180,
    },
    small: {
      breakpoint: { max: 649, min: 500 },
      items: 1,
      partialVisibilityGutter: 100,
    },
    extraSmall: {
      breakpoint: { max: 499, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="testimonials-container">
      <Typography
        variant="h4"
        component="h2"
        align="center"
        fontFamily="Poppins"
        fontWeight={900}
        padding={{
          xs: "0.5rem 0",
          md: "2rem 0",
        }}
        fontSize={{
          xs: "1.5rem",
          md: "2rem",
        }}
      >
        Nos témoignages
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "column" },
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Carousel
          responsive={responsive}
          infinite
          showDots={false}
          autoPlay={true}
          partialVisible={true}
          keyBoardControl={true}
          containerClass={"testimonials-carousel"}
        >
          {testimonialCards?.map((card) => (
            <CardsTestimials card={card} key={card.id} />
          ))}
        </Carousel>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <OrangeBtnWhiteHover>
            Découvrir tous les témoignages
          </OrangeBtnWhiteHover>
        </Box>
      </Box>
    </div>
  );
}

export default Testimonials;
