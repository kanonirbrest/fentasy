import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Routes from "@/routes/index.js";
import ThemeProvider from "@/theme/theme/index.js";

// import ThemeProvider from "@/theme/theme/index.js";
import "./App.css";
import "./styles/global.css";

function App() {
  return (
    <GoogleOAuthProvider clientId="865751758094-aopd0ht665u5u6ub87oflfh5k9tuqh00.apps.googleusercontent.com">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </LocalizationProvider>
    </GoogleOAuthProvider>
  );
}
export default App;
