import { createTheme, ThemeProvider } from "@mui/material";
import { red } from "@mui/material/colors";
import { ReactNode } from "react";

interface ThemeProps {
	children: ReactNode;
}

const theme = createTheme({
	palette: {
		primary: {
			light: "#757ce8",
			main: "#3f50b5",
			dark: "#002884",
			contrastText: "#fff"
		},
		secondary: {
			light: "#ff7961",
			main: "#f44336",
			dark: "#ba000d",
			contrastText: "#000"
		}
	}
});

const Theme: React.FC<ThemeProps> = ({ children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
