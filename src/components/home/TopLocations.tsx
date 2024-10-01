import { Stack, Typography } from "@mui/material";
import Carousel from "../utils/carousel/Carousel";

function TopLocations() {
  return (
    <Stack direction={"column"} marginTop={"5rem"}>
      <Stack direction={"column"} gap={2}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          fontFamily={"Poppins"}
          fontWeight={700}
        >
          Réservez en ligne, c&apos;est simple et rapide !
        </Typography>
        <Typography
          variant="body1"
          textAlign={"center"}
          marginInline={"auto"}
          fontFamily={"Poppins"}
          fontWeight={400}
          // width={"33ch"}
        >
          Nos équipes vous accompagnent tout au long de votre location.
        </Typography>
      </Stack>
      <Carousel type="TopLocations" />
    </Stack>
  );
}

export default TopLocations;
