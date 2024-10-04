import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import { red } from "@mui/material/colors";
import AuthProvider from "./context/AuthContext";
import Routes from "./Router";
import Theme from "./themes";

function App() {
	return (
		<div className="App">
			<Theme>
				<AuthProvider>
					<Routes />
				</AuthProvider>
			</Theme>
		</div>
	);
}

export default App;
