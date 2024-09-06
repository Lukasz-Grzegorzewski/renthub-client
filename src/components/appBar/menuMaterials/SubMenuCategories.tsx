import { ICategory } from "@/types/ICategory";
import { Box, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { VariablesColors } from "@/styles/Variables.colors";

export interface SubMenuCategoriesProps {
  title: string;
  listCategories: ICategory[];
  onCategorySelected: (categoryId: string) => void;
}

function SubMenuCategories({
  title,
  listCategories,
  onCategorySelected,
}: SubMenuCategoriesProps) {
  const { orangeColor } = new VariablesColors();
  const [hoveredItemId, setHoveredItemId] = useState(null);

  function handleClick(category: ICategory) {
    if (onCategorySelected) {
      onCategorySelected(String(category.id));
    }
  }

  /** organise et creer l'arboresence des categorie par lettre alphabétique **/
  const groupedCategories = listCategories.reduce((acc, item) => {
    // initialisation de l'objet par une lettre avec 1er eleement du tableau
    const firstLetter = item.name[0].toUpperCase();

    if (!acc[firstLetter] && !item.parentCategory) {
      acc[firstLetter] = [];
    }

    if (!item.parentCategory) {
      acc[firstLetter].push(item);
    }
    return acc;
  }, {});

  return (
    <div className="submenu-categories">
      <Box>
        <Box textAlign={"left"} color={"white"}>
          <Typography fontSize={"1.5rem"} padding={"1rem 0 "}>
            {title}
          </Typography>
          {Object.keys(groupedCategories).map((letter) => (
            <div key={letter}>
              <Typography
                variant="caption"
                fontSize={"1.2rem"}
                fontWeight={600}
                padding={"0rem"}
                margin={"0.3rem 0 0 0"}
                borderRadius={"1rem"}
                color={"white"}
                bgcolor={orangeColor}
                width={"3rem"}
                textAlign={"center"}
                display={"inline-block"}
                marginBottom={"1rem"}
              >
                {letter}
              </Typography>
              <ul>
                {groupedCategories[letter].map((category: ICategory) => (
                  <li
                    style={{ border: "1px solid transparent" }}
                    key={category.id}
                    onClick={(e) => handleClick(category)}
                    onMouseEnter={() => setHoveredItemId(category.id)}
                    onMouseLeave={() => setHoveredItemId(null)}
                  >
                    <Box
                      display={"flex"}
                      padding={"0.4rem 0"}
                      justifyContent="space-between"
                      flexDirection={"row"}
                      alignItems={"center"}
                    >
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        padding={"0 0.4rem"}
                        alignItems={"center"}
                      >
                        {category.picture?.urlMiniature && (
                          <CardMedia
                            component="img"
                            alt={category.name}
                            image={`${process.env.NEXT_PUBLIC_PATH_IMAGE}${category.picture.urlMiniature}`}
                            sx={{
                              height: "30px",
                              objectFit: "contain",
                            }}
                          />
                        )}
                        <Typography padding={"0 1rem"}>
                          {category.name}
                        </Typography>
                      </Box>

                      <Box
                        display={"flex"}
                        justifyContent="space-between"
                        flexDirection={"row"}
                        height={"100%"}
                        alignItems={"center"}
                      >
                        {hoveredItemId === category.id && (
                          <ArrowForwardIosIcon fontSize="small" />
                        )}
                      </Box>
                    </Box>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Box>
      </Box>
    </div>
  );
}

export default SubMenuCategories;
