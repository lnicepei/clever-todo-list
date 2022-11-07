import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#FFF",
      light: "#797a7c33",
      dark: "#121212",
    },
  },
});
