import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { fr } from "date-fns/locale";
import {
  Box,
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { VariablesColors } from "@/styles/Variables.colors";
import { DateRangeState } from "../../pages/cart/[productId]/add";
import { CiCalendarDate } from "react-icons/ci";

type DateRangePickerProps = {
  state: DateRangeState;
  setState: (state: any) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
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
            <TextField
              type="number"
              label="Qté"
              size="small"
              disabled={quantityAvailable ? false : true}
              value={quantityAvailable ? quantity : ""}
              onChange={(e) => {
                Number(e.target.value) <= quantityAvailable &&
                  Number(e.target.value) > 0 &&
                  setQuantity(Number(e.target.value));
              }}
              sx={{ width: "30%" }}
            />
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
