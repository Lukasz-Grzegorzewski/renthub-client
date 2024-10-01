import {
  AppBar,
  Box,
  Button,
  CardMedia,
  Container,
  IconButton,
  Toolbar,
} from "@mui/material";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import * as React from "react";
import { useRouter } from "next/router";
import ResponsiveMenu from "./ResponsiveMenu";
import { VariablesColors } from "@/styles/Variables.colors";
import MenuCategoriesProduct from "./menuMaterials/MenuCategoriesProduct";
import SearchBar from "./SearchBar";
import { useMutation } from "@apollo/client";
import { useUserContext } from "@/context/UserContext";
import { mutationSignOut } from "@/graphql/user/mutationSignOut";
// import { logo } from "@/../public/images/renthub-logo.svg";

function Navbar(): React.ReactNode {
  const [query, setQuery] = React.useState<string>("");
  const router = useRouter();
  const { orangeColor } = new VariablesColors();

  const [showMenuCategories, setShowMenuCategories] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  /* Menu item, redirect to the well path */
  const { user, refetchUserContext } = useUserContext();
  // Signout
  const [doSignout] = useMutation(mutationSignOut, {
    onCompleted: () => {
      refetchUserContext();
    },
  });
  const handleSignOut = () => {
    doSignout();
  };

  /* Menu item, redirect to the well path */
  const pages_notConnected = [
    { title: "Nos agences", path: "/agencies" },
    { title: "Se connecter", path: "/signin" },
  ];

  const pages_connected = [
    { title: "Mon panier", path: "/cart" },
    { title: "Vos commandes", path: "/order" },
    { title: "Deconnection", path: "/signin" },
  ];

  const pages = user ? pages_connected : pages_notConnected;

  const handleMenuCategoriesClick = (event: React.MouseEvent<HTMLElement>) => {
    setShowMenuCategories(!showMenuCategories);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleMenuCategoriesClose = () => {
    setShowMenuCategories(!showMenuCategories);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#fff" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              display={"flex"}
              gap={2}
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              <CardMedia
                component="img"
                image={"/renthub-logo.svg"}
                alt="Renthub Logo"
                sx={{
                  width: 201,
                  height: 38.74,
                  cursor: "pointer",
                  alignSelf: "center",
                }}
                onClick={() => {
                  router.push("/");
                }}
              />
              <Button
                aria-describedby={id}
                type="button"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                }}
                variant="contained"
                size="large"
                onClick={handleMenuCategoriesClick}
              >
                Nos matériels
              </Button>
              {/* composant pop over */}
              <MenuCategoriesProduct
                id={id}
                open={open}
                anchorEl={anchorEl}
                handleMenuCategoriesClose={handleMenuCategoriesClose}
              />
            </Box>
            {/* Responsive */}
            {/* Display favicon logo on mobile */}
            <Box
              sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
            >
              <CardMedia
                component="img"
                image="/renthub-logo-mini.svg"
                alt="Renthub Logo"
                sx={{
                  width: 40,
                  height: 40,
                  cursor: "pointer",
                  alignSelf: "center",
                }}
                onClick={() => {
                  router.push("/");
                }}
              />

              {/* @TODO: set modal in responsive menu */}
              <IconButton
                aria-describedby={id}
                aria-label="materiels"
                size="large"
                sx={{
                  color: orangeColor,
                }}
                onClick={handleMenuCategoriesClick}
              >
                <ExpandCircleDownOutlinedIcon fontSize="inherit" />
              </IconButton>
            </Box>

            <SearchBar
              backgroundColor="white"
              borderColor="white"
              colorText={"#777777"}
              query={query}
              setQuery={setQuery}
            />

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
              gap={2}
            >
              {pages.map((page, idx) => (
                <Button
                  key={idx}
                  onClick={() => {
                    if (page.title === "Deconnection") {
                      handleSignOut();
                    }
                    router.push(page.path);
                  }}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>
            {/* Responsive Component usefull for displaying menu item {page} with menu icon icon  */}
            <ResponsiveMenu pages={pages} router={router} />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Navbar;
