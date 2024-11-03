import { CircularProgress } from "@mui/material";
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Fallback from "../views/Fallback";

export type AuthContextType = {
	token: string | null;
	login: (newToken: string) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
	token: null,
	login: () => {},
	logout: () => {}
} as AuthContextType);

const AuthProvider = ({ children }: any) => {
	const [token, setToken_] = useState(localStorage.getItem("token"));
	const [isLoading, setIsLoading] = useState(true);

	const login = (newToken: string) => {
		setToken_(newToken);
		localStorage.setItem("token", newToken);
	};

	const logout = () => {
		setToken_(null);
		localStorage.clear();
	};

	const isTokenValid = (token: string) => {
		const tokenParts = token.split(".");
		const encodedPayload = tokenParts[1];
		const rawPayload = atob(encodedPayload);
		const payload = JSON.parse(rawPayload);
		const exp = payload.exp;
		const now = Date.now() / 1000;
		return now < exp;
	};

	useEffect(() => {
		const checkToken = async () => {
			const delay = (ms: number) =>
				new Promise((resolve) => setTimeout(resolve, ms));

			if (token) {
				await delay(500);

				const isValid = isTokenValid(token);

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
