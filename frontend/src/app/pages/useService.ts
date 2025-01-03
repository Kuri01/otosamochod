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
	const addCar = async (carData: Car, images: File[]): Promise<Car> => {
		try {
			var res = await api.post<Car>("/cars", carData);

			const imageUploadPromises = images.map((image) => uploadImage("/cars/" + res.id, image));

			const uploadedImageUrls = await Promise.all(imageUploadPromises);
			carData.images = uploadedImageUrls;

			return carData;
		} catch (error) {
			console.error("Błąd podczas dodawania samochodu:", error);
			throw error;
		}
	};

	const uploadImage = async (carKey: string, image: File): Promise<string> => {
		const formData = new FormData();
		formData.append("file", image);
		formData.append("car", carKey);
		try {
			const response = await api.post<{ contentUrl: string }>("/media_objects", formData);
			return response.contentUrl;
		} catch (error) {
			console.error("Błąd podczas przesyłania zdjęcia:", error);
			throw error;
		}
	};

	const getCars = async (page: number): Promise<Car[]> => {
		const response = await api.get<{ "hydra:member": Car[] }>(`/cars?page=${page}`);

		var result = response["hydra:member"];

		for (let i = 0; i < result.length; i++) {
			result[i].images = await api.get<any>(`/media_objects?page=` + result[i].id).then((res) => {
				return res["hydra:member"];
			});
		}

		return result;
	};
	const getCarById = async (id: number) => {
		var res = await api.get<Car>(`/cars/${id}`);
		var images = await api.get<any>(`/media_objects?page=` + id);
		res.images = images["hydra:member"];
		return res;
	};
	const getUserCars = async (page: number): Promise<Car[]> => {
		const res = await api.get<{ "hydra:member": Car[] }>(`/cars/my?page=${page}`);

		var result = res["hydra:member"];

		for (let i = 0; i < result.length; i++) {
			result[i].images = await api.get<any>(`/media_objects?page=` + result[i].id).then((res) => {
				return res["hydra:member"];
			});
		}

		return result;
	};
	const deleteCar = async (id: number): Promise<void> => {
		try {
			await api.del(`/cars/${id}`);
		} catch (error) {
			console.error(`Błąd podczas usuwania samochodu o ID ${id}:`, error);
			throw error;
		}
	};

	return {
		login,
		register,
		passwordReset,
		me,
		addCar,
		uploadImage,
		getCars,
		changePassword,
		getCarById,
		getUserCars,
		deleteCar,
	};
};

export default useService;
