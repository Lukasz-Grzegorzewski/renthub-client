import React from "react";
import { Box, Container, Link, Typography } from "@mui/material";
import MenuCardProps from "@/types/MenuFooterTypes";

function FooterMenuCard({
  menuCard,
}: {
  menuCard: MenuCardProps;
}): React.ReactNode {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0,

        justifyContent: "center",
        alignItems: "center",
        width: "auto",

        padding: "1.5rem 0",
        margin: "0rem",
      }}
    >
      <div>
        <Typography
          variant="h6"
          component="h3"
          textAlign="left"
          fontWeight={100}
          fontSize="1rem"
        >
          {menuCard.title}
        </Typography>

        <Box
          sx={{
            display: { xs: "block", md: "block" },
            marginTop: { md: "1rem" },
          }}
        >
          {menuCard.links.map((link) => (
            <Link key={link.id} href={link.url}>
              <Typography
                variant="body1"
                width={"100%"}
                padding={"0.1rem 0"}
                component="div"
                textAlign="left"
                fontSize="0.7rem"
                fontWeight={600}
              >
                {link.name}
              </Typography>
            </Link>
          ))}
        </Box>
      </div>
    </Box>
  );
}

FooterMenuCard.propTypes = {};

export default FooterMenuCard;
