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
			const imageUploadPromises = images.map((image) => uploadImage(image));
			const uploadedImageUrls = await Promise.all(imageUploadPromises);

			const carDataWithImages = { ...carData, images: uploadedImageUrls };

			return await api.post<Car>("/cars", carDataWithImages);
		} catch (error) {
			console.error("Błąd podczas dodawania samochodu:", error);
			throw error;
		}
 };

 const uploadImage = async (image: File): Promise<string> => {
		const formData = new FormData();
		formData.append("file", image);

		try {
			const response = await api.post<{ contentUrl: string }>("/#/MediaObject/api_media_objects_post", formData);
			return response.contentUrl;
		} catch (error) {
			console.error("Błąd podczas przesyłania zdjęcia:", error);
			throw error;
		}
 };
 const getCars = async (page: number): Promise<Car[]> => {
		const response = await api.get<{ "hydra:member": Car[] }>(`/cars?page=${page}`);
		return response["hydra:member"];
 };
 const getCarById = (id: number) => {
		return api.get<Car>(`/cars/${id}`);
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
  };
};

export default useService;
