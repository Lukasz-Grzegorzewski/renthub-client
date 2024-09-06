import { VariablesColors } from "@/styles/Variables.colors";
import { ICategory } from "@/types/ICategory";
import { Box, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export interface SubMenuProductProps {
  idCategoryParent: string;
  title: string;
  listChildCategories?: ICategory[] | null;
  handleMenuCategoriesClose: () => void;
}

function SubMenuChildCategories({
  idCategoryParent,
  title,
  listChildCategories,
  handleMenuCategoriesClose,
}: SubMenuProductProps): React.ReactNode {
  const { darkBlueColor, whiteColor } = new VariablesColors();

  const sortedChildCategories = listChildCategories
    ? [...listChildCategories].sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    : [];

  return (
    <Box
      minWidth={"400px"}
      marginTop={3}
      flexDirection={"column"}
      gap={2}
      display={"flex"}
    >
      <Typography textAlign={"left"} color={"black"}>
        {title}
        {/* {idCategoryParent} */}
      </Typography>

      <Box display={"flex"} flexDirection={"column"} gap={1.5}>
        {sortedChildCategories &&
          sortedChildCategories?.map((category) => (
            <li key={category.id} onClick={handleMenuCategoriesClose}>
              <Link href={`/product/category/${category.id}`}>
                <Box gap={1} display={"flex"} justifyContent={"start"}>
                  {category?.picture?.urlMiniature && (
                    <CardMedia
                      component="img"
                      alt={category.name}
                      image={`${process.env.NEXT_PUBLIC_PATH_IMAGE}${category.picture.urlMiniature}`}
                      sx={{
                        width: "50px",
                        objectFit: "contain",
                      }}
                    />
                  )}
                  <Typography
                    padding={"0 1rem"}
                    flexGrow={1}
                    sx={{
                      "&:hover": {
                        backgroundColor: darkBlueColor,
                        color: whiteColor,
                        outline: "1px solid #12637e",
                        borderRadius: "5px",
                        cursor: "pointer",
                      },
                    }}
                  >
                    {category.name}
                  </Typography>
                </Box>
              </Link>
            </li>
          ))}
      </Box>
    </Box>
  );
}

export default SubMenuChildCategories;
