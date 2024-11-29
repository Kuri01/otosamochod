import { useAlert } from "../systems/useAlert";
import useApi from "../systems/useApi";

interface LoginData {
	email: string;
	password: string;
}

interface RegisterData {
	name: string;
	surname: string;
	phone: string;
	email: string;
	plainPassword: string;
}

interface LoginResponse {
	token: string;
}

interface PasswordReset {
	email: string;
}

export interface User {
	email: string;
	id: number;
	name: string;
	surname: string;
}

const useService = () => {
	const api = useApi();

	const login = (data: LoginData) => {
		return api.post<LoginResponse>("/auth/login", data);
	};

	const register = (data: RegisterData) => {
		return api.post("/auth/register", data);
	};

	const passwordReset = (data: PasswordReset) => {
		return api.post("/auth/password-reset/", data);
	};

	const me = () => {
		return api.get<User>("/users/me");
	};

	return { login, register, passwordReset, me };
};

export default useService;
