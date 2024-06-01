import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

import { components } from './components/components.js';
import { colorSchemes } from './color-schemes.js';
import { shadows } from './shadows';
import { typography } from './typography';

export function createTheme() {
  const theme = extendTheme({
    breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1440 } },
    components,
    colorSchemes,
    shadows,
    shape: { borderRadius: 8 },
    typography,
  });

  return theme;
}