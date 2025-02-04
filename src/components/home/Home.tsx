import { Grid, useMediaQuery } from "@mui/material";
import Hero from "./Hero";
import InfoLocation from "./InfoLocation";
import Promotions from "./Promotions";
import Articles from "./Articles";
import Testimonials from "./Testimonials";
import TopLocations from "./TopLocations";

function Home() {
  const styleHome = {
    margin: "auto",
  };

  const matchSize599 = useMediaQuery("(max-width:599px)");
  const styleHero = {
    position: "relative",
    background: "url('/images/heroBackground.jpg')",
    backgroundAttachment: "cover",
    backgroundPosition: "center 30%",
    backgroundSize: "cover",
    height: matchSize599 ? "605px" : "500px",
  };

  return (
    <Grid container justifyContent={"center"} sx={{ ...styleHome }}>
      <Grid item xs={12} lg={9} sx={{ ...styleHero }}>
        <Hero />
      </Grid>
      <Grid className="body" item xs={11}>
        <InfoLocation />
      </Grid>
      <Grid className="body" item xs={11}>
        <Promotions />
      </Grid>
      <Grid className="body" item xs={11}>
        <TopLocations />
      </Grid>
      <Grid item xs={12} component={"section"}>
        <Articles />
      </Grid>
      <Grid item xs={12}>
        <Testimonials />
      </Grid>
    </Grid>
  );
}

export default Home;
