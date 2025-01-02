import { useAlert } from "../systems/useAlert";
import { Car } from "../../types/car";
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

export interface ChangePassword {
	token: string | undefined;
	password: string;
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

	const changePassword = (data: ChangePassword) => {
		return api.post("/auth/password-reset/" + data.token, data);
	};

	const me = () => {
		return api.get<User>("/users/me");
	};
	const addCar = (carData: any) => {
		return api.post("/cars", carData);
	};
	const getCars = async (page: number): Promise<Car[]> => {
		const response = await api.get<{ "hydra:member": Car[] }>(`/cars?page=${page}`);
		return response["hydra:member"];
	};

	return { login, register, passwordReset, me, addCar, getCars, changePassword };
};

export default useService;
