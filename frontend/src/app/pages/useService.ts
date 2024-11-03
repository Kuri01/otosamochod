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

const useService = () => {
	const api = useApi();

	const login = (data: LoginData) => {
		return api.post<LoginResponse>("/auth/login", data);
	};

	const register = (data: RegisterData) => {
		return api.post("/auth/register", data);
	};

	return { login, register };
};

export default useService;
