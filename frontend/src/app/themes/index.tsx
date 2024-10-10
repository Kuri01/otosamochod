import { createTheme, ThemeProvider } from "@mui/material";
import { red } from "@mui/material/colors";
import { ReactNode } from "react";

interface ThemeProps {
	children: ReactNode;
}

const theme = createTheme({
	shape: {
		borderRadius: 12
	},
	palette: {
		mode: "light",
		primary: {
			main: "rgb(82, 61, 210)",
			light: "rgb(195, 188, 242)"
		},
		secondary: {
			main: "rgb(77, 175, 80)"
		},

		background: {
			default: "#DBDBDB"
		},
		info: {
			main: "#889FC6"
		},
		text: {
			primary: "#000000",
			secondary: "#000000"
		}
	},
	typography: {
		fontFamily: "Poppins"
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-notchedOutline": {
						borderColor: "#8376D7"
					},
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: "#8376D7"
					},
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: "#8376D7"
					}
				}
			}
		}
	}
});

const Theme: React.FC<ThemeProps> = ({ children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
