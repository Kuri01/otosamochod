import { useAlert } from "../../systems/useAlert";
import useApi from "../../systems/useApi";

interface UserDetails {
    name: string;
    surname: string;
    email: string;
    phone: string;
}


const useService = () => {
	const api = useApi();
	const { showAlert } = useAlert();

	const getUserDetails = async ({ id }: { id: number }) => {
		try {
			const response = await api.get("/users/"+id);
			return response;
		} catch (error) {
			showAlert("Nie udało się pobrać danych", "error");
		}
	};


	return { getUserDetails };
};

export default useService;
