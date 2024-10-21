import { CircularProgress } from "@mui/material";
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Fallback from "../views/Fallback";
import { useNavigate } from "react-router-dom";

export type AuthContextType = {
	token: string | null;
	login: () => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: any) => {
	const [token, setToken_] = useState(localStorage.getItem("token"));
	const [isLoading, setIsLoading] = useState(true);

	const setToken = (newToken: string) => {
		setToken_(newToken);
	};

	const logout = () => {
		setToken_(null);
	};

	const validateToken = async (token: string) => {
		try {
			// Replace the URL with your actual token validation endpoint
			const response = await axios.post("/api/validate-token", { token });
			return response.status === 200;
		} catch (error) {
			return false;
		}
	};

	useEffect(() => {
		const checkToken = async () => {
			const delay = (ms: number) =>
				new Promise((resolve) => setTimeout(resolve, ms));

			if (token) {
				await delay(500);

				const isValid = true;

				if (!isValid) {
					logout();
				} else {
					axios.defaults.headers.common["Authorization"] = "Bearer " + token;
					localStorage.setItem("token", token);
				}
			} else {
				delete axios.defaults.headers.common["Authorization"];
				localStorage.removeItem("token");
			}

			setIsLoading(false);
		};

		checkToken();
	}, [token]);

	const login = () => {
		setToken("123");
	};

	const contextValue = useMemo(
		() => ({
			token,
			login,
			logout
		}),
		[token]
	);

	if (isLoading) {
		return <Fallback />;
	}
	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthProvider;
