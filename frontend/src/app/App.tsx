import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import AuthProvider from "./context/AuthContext";
import Routes from "./Router";
import Theme from "./themes";

function App() {
  return (
    <Theme>
      <CssBaseline />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Theme>
  );
}

export default App;
