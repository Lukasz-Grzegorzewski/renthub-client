import { Box, Link, Typography } from "@mui/material";
import React from "react";

export interface SubMenuProductProps {
  title: string;
  listProducts: { id: number; title: string; description: string }[]; // Définir le type de listProducts
}

function SubMenuProduct({
  title,
  listProducts,
}: SubMenuProductProps): React.ReactNode {
  return (
    <Box marginTop={3} flexDirection={"column"} gap={2} display={"flex"}>
      <Typography textAlign={"left"} color={"black"}>
        {title}
      </Typography>

      <Box display={"flex"} flexDirection={"column"} gap={1.5}>
        {listProducts?.map((product) => (
          <li key={product.id}>
            <Link href={`/pages/product/${product.id}`}>
              <a>{product.title}</a>
            </Link>
          </li>
        ))}
      </Box>
    </Box>
  );
}

export default SubMenuProduct;
