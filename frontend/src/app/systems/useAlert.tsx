import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

interface AlertContextType {
	showAlert: (
		message: string,
		severity: "success" | "info" | "warning" | "error"
	) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = (): AlertContextType => {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error("useAlert must be used within an AlertProvider");
	}
	return context;
};

interface AlertProviderProps {
	children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
	const [alert, setAlert] = useState<{
		message: string;
		severity: "success" | "info" | "warning" | "error";
		open: boolean;
	}>({
		message: "",
		severity: "success",
		open: false
	});

	const showAlert = (
		message: string,
		severity: "success" | "info" | "warning" | "error"
	) => {
		setAlert({ message, severity, open: true });
	};

	const handleClose = () => {
		setAlert((prev) => ({ ...prev, open: false }));
	};

	return (
		<AlertContext.Provider value={{ showAlert }}>
			{children}
			<Snackbar
				open={alert.open}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={handleClose}
					severity={alert.severity}
					sx={{ width: "100%" }}
				>
					{alert.message}
				</Alert>
			</Snackbar>
		</AlertContext.Provider>
	);
};
