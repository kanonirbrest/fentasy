import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import Routes from "@/routes/index.js";

import "./App.css";
import "./styles/global.css";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </LocalizationProvider>
  );
}
export default App;
