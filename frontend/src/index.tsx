import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "@fontsource/poppins";

import "./index.css";
import { AlertProvider } from "./app/systems/useAlert";
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<AlertProvider>
			<App />
		</AlertProvider>
	</React.StrictMode>
);
