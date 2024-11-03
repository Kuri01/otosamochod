import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useApi = () => {
	const auth = useAuth();

	const instance = axios.create({
		baseURL: process.env.REACT_APP_API_URL,
		headers: auth.token ? { Authorization: `Bearer ${auth.token}` } : {}
	});

	const get = async <T>(url: string) => {
		const response = await instance.get<T>(url);
		return response.data;
	};

	const post = async <T>(url: string, data: any) => {
		const response = await instance.post<T>(url, data);
		return response.data;
	};

	const put = async <T>(url: string, data: any) => {
		const response = await instance.put<T>(url, data);
		return response.data;
	};

	const del = async <T>(url: string) => {
		const response = await instance.delete<T>(url);
		return response.data;
	};

	return { get, post, put, del };
};

export default useApi;
