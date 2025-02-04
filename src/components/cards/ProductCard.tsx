import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { CardDetailsBtn } from "@/styles/MuiButtons";
import Link from "next/link";
import { VariablesColors } from "@/styles/Variables.colors";
import CollapseCard from "../utils/CollapseCard";
import { IPicture } from "@/types/IPicture";

type ProductCardPropsType = {
  id: number;
  brandName: string;
  name: string;
  price: number | number[];
  description: string;
  pictures: IPicture[];
};

function ProductCard({
  id,
  brandName,
  name,
  price,
  pictures,
}: ProductCardPropsType) {
  const { darkBlueColor, orangeColor } = new VariablesColors();
  const priceArray = Array.isArray(price) ? price : [price];

  return (
    <Card
      sx={{
        minWidth: 286,
        width: 286,
        minHeight: "fit-content",
        borderRadius: "20px",
        boxShadow: "none",
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "background-color 0.3s ease",
        "--colorBtnCard": darkBlueColor,
        "@media (hover: hover)": {
          "&:hover": {
            backgroundColor: darkBlueColor,
            color: "white",
            "--colorBtnCard": orangeColor,
          },
        },
      }}
    >
      <Stack
        direction={"column"}
        justifyContent="flex-start"
        alignItems={"center"}
        padding={"20px"}
      >
        <Box
          sx={{
            height: "130px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            borderRadius: "20px",
          }}
        >
          <CardMedia
            component="img"
            alt={name}
            image={`${process.env.NEXT_PUBLIC_PATH_IMAGE}${pictures[0].urlMiniature}`}
            sx={{ width: "150px", height: "150px", objectFit: "contain" }}
            draggable={false}
          />
        </Box>
        <Box sx={{ alignSelf: "flex-start" }}>
          <Typography component={"span"} fontSize={"0.7rem"}>
            {brandName}
          </Typography>
          <Typography
            paddingTop={2}
            variant="h6"
            component="div"
            sx={{ marginBottom: 0 }}
          >
            <Typography fontWeight={"bold"} textTransform={"uppercase"}>
              {name}
            </Typography>
          </Typography>
        </Box>
      </Stack>
      <CardContent>
        <Stack
          direction={"column"}
          justifyContent="flex-start"
          alignItems="flex-start"
          gap={2}
          sx={{ width: "100%" }}
        >
          <Box sx={{ position: "relative", height: "25px" }}>
            <Box sx={{ position: "absolute", zIndex: 2 }}>
              <CollapseCard id={id} list={priceArray} />
            </Box>
          </Box>
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Link href={`/product/${id}`} style={{ textDecoration: "none" }}>
              <CardDetailsBtn sx={{ backgroundColor: "var(--colorBtnCard)" }}>
                <Typography variant="body2">Voir le matériel</Typography>
              </CardDetailsBtn>
            </Link>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
