import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { fr } from "date-fns/locale";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { VariablesColors } from "@/styles/Variables.colors";
import { DateRangeState } from "../../pages/cart/[productId]/add";
import { CiCalendarDate } from "react-icons/ci";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

type DateRangePickerProps = {
  state: DateRangeState;
  setState: (state: any) => void;
  quantity: number;
  setQuantity: (quantity: number | ((prev: number) => number)) => void;
  quantityAvailable: number | undefined;
  addProductCart: () => void;
};

export default function DateRangePicker({
  state,
  setState,
  quantity,
  setQuantity,
  quantityAvailable,
  addProductCart,
}: DateRangePickerProps) {
  const { orangeColor } = new VariablesColors();

  function handleReset() {
    setState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    setQuantity(1);
  }

  return (
    <Box>
      <Box display={"flex"} gap={1} alignItems={"baseline"}>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <CiCalendarDate size={40} />
        </Box>
        <Box>
          <Typography
            variant="h4"
            mt={3}
            textAlign={"center"}
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "2.5rem",
              },
            }}
          >
            Quelle est votre période de location ?
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        pb={20}
        pt={5}
        sx={{
          flexDirection: "column",
        }}
      >
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          locale={fr}
          rangeColors={[orangeColor]}
          minDate={new Date()}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box display="flex" gap={2}>
              <TextField
                type="number"
                label="Qté"
                size="small"
                disabled={quantityAvailable ? false : true}
                value={quantityAvailable ? quantity : ""}
                sx={{ width: "30%" }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem", // Space between the input and buttons
                }}
              >
                {/* Add Button */}
                <IconButton
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    outline: `1px solid black`,
                    borderRadius: "50%",
                    backgroundColor: "transparent",
                    "@media (hover: hover)": {
                      "&:hover": {
                        backgroundColor: "orange",
                        outline: `1px solid orange`,
                        "& .MuiSvgIcon-root": {
                          color: "white",
                        },
                      },
                    },
                    "& .MuiSvgIcon-root": {
                      color: "black",
                    },
                  }}
                  onClick={(e) => {
                    quantity > 1 && setQuantity((prev) => prev - 1);
                  }}
                >
                  <RemoveIcon />
                </IconButton>

                <IconButton
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    outline: `1px solid black`,
                    borderRadius: "50%",
                    backgroundColor: "transparent",
                    "@media (hover: hover)": {
                      "&:hover": {
                        backgroundColor: "orange",
                        outline: `1px solid orange`,
                        "& .MuiSvgIcon-root": {
                          color: "white",
                        },
                      },
                    },
                    "& .MuiSvgIcon-root": {
                      color: "black",
                    },
                  }}
                  onClick={(e) =>
                    quantity < quantityAvailable &&
                    setQuantity((prev) => prev + 1)
                  }
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Typography variant="body1">Disponible :</Typography>
              {quantityAvailable ? (
                <Typography variant="body1">{quantityAvailable}</Typography>
              ) : (
                <CircularProgress size={"1rem"} />
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{ color: "white" }}
              onClick={addProductCart}
            >
              Ajouter au panier
            </Button>
            <Button sx={{ color: "black" }} onClick={handleReset}>
              Réinitialiser
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
