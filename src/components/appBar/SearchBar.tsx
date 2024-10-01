import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { CancelOutlined } from "@mui/icons-material";
import { VariablesColors } from "@/styles/Variables.colors";

export interface SearchBarProps {
  backgroundColor: string;
  borderColor: string;
  colorText: string;
  query: string;
  setQuery: (query: string) => void;
}

function SearchBar({
  backgroundColor,
  borderColor,
  colorText,
  query,
  setQuery,
}: SearchBarProps): React.ReactNode {
  const { orangeColor } = new VariablesColors();

  return (
    <FormControl sx={{ mx: "auto", width: "30ch" }} variant="outlined">
      <InputLabel
        variant="outlined"
        sx={{
          color: query === "" ? colorText : orangeColor,
          backgroundColor: "white",
          borderRadius: "7px 7px 0 0",
          paddingInline: "8px",
          marginLeft: "-4px",
        }}
        htmlFor="search"
        size="small"
      >
        Rechercher
      </InputLabel>
      <OutlinedInput
        sx={{
          backgroundColor: "white",
        }}
        id="search"
        type="text"
        size="small"
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
        }}
        endAdornment={
          query !== "" && (
            <InputAdornment position="end">
              <IconButton aria-label="search" onClick={() => setQuery("")}>
                <CancelOutlined />
              </IconButton>
            </InputAdornment>
          )
        }
        label="Rechercher"
      />
    </FormControl>
  );
}

export default SearchBar;
