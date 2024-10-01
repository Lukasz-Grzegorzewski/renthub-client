import { Box, Typography, useMediaQuery } from "@mui/material";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { OrangeBtnWhiteHover } from "@/styles/MuiButtons";
import type TestimonialCardPropsType from "@/types/TestimonialsTypes";
import Carousel from "../utils/carousel/Carousel";

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
  const matche500 = useMediaQuery("(max-width:500px)");

  return (
    <Box className="testimonials-container">
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
        <Carousel type="Testimonials" testimonialCards={testimonialCards} />

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
    </Box>
  );
}

export default Testimonials;
