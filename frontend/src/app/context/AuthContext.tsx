import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Fallback from "../views/Fallback";
import useService, { User } from "../pages/useService";

export type AuthContextType = {
	token: string | null;
	user: User | null;
	login: (newToken: string) => void;
	logout: () => void;
	isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
	token: null,
	user: null,
	login: () => {},
	logout: () => {},
	isLoading: true
} as AuthContextType);

const AuthProvider = ({ children }: any) => {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const login = (newToken: string) => {
		setToken(newToken);
		localStorage.setItem("token", newToken);
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.clear();
	};

	const decodeToken = (token: string) => {
		const tokenParts = token.split(".");
		const encodedPayload = tokenParts[1];
		const rawPayload = atob(encodedPayload);
		return JSON.parse(rawPayload);
	};

	const isTokenValid = (token: string) => {
		const { exp } = decodeToken(token);
		const now = Date.now() / 1000;
		return now < exp;
	};

	const getUser = (): Promise<User> => {
		const instance = axios.create({
			baseURL: process.env.REACT_APP_API_URL,
			headers: token ? { Authorization: `Bearer ${token}` } : {}
		});

		return instance.get<User>("/users/me").then((res) => {
			const user = {
				id: res.data.id,
				email: res.data.email,
				name: res.data.name,
				surname: res.data.surname
			};
			setUser(user);
			return user;
		});
	};

	const fetchUserData = async () => {
		const delay = (ms: number) =>
			new Promise((resolve) => setTimeout(resolve, ms));

		await delay(500);

		if (!token) {
			setIsLoading(false);
			return;
		}

		if (!isTokenValid(token)) {
			logout();
			setIsLoading(false);
			return;
		}

		await getUser().finally(() => {
			setIsLoading(false);
		});
	};

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		if (storedToken) {
			setToken(storedToken);
		} else {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		if (token) {
			fetchUserData();
		}
	}, [token]);

	const contextValue = useMemo(
		() => ({
			token,
			user,
			login,
			logout,
			isLoading
		}),
		[token, user, isLoading]
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
