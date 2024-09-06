import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { CancelOutlined } from "@mui/icons-material";

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
  return (
    <FormControl sx={{ mx: "auto", width: "30ch" }} variant="outlined">
      <InputLabel
        variant="outlined"
        sx={{
          color: { colorText },
        }}
        htmlFor="search"
        size="small"
      >
        Rechercher
      </InputLabel>
      <OutlinedInput
        sx={{
          backgroundColor: "white", // { backgroundColor },
          color: { colorText },
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
              <IconButton aria-label="search">
                <CancelOutlined onClick={() => setQuery("")} />
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
