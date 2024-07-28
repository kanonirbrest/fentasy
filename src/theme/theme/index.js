import { useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

import { customShadows } from "./custom-shadows";
import { overrides } from "./overrides";
import { palette } from "./palette";
import { shadows } from "./shadows";

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const memoizedValue = useMemo(
    () => ({
      palette: palette(),
      typography: {
        fontFamily: "Rubik Bubbles, sans-serif",
      },
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    [],
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
