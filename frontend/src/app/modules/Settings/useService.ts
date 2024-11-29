import { useAlert } from "../../systems/useAlert";
import useApi from "../../systems/useApi";

interface UserDetails {
	name: string;
	surname: string;
	email: string;
	phone: string;
}

interface PatchMeRequest {
	name: string;
	surname: string;
	phone: string;
}

const useService = () => {
	const api = useApi();

	const getUserDetails = ({ id }: { id: number }) => {
		return api.get("/users/" + id);
	};

	
	const me = () => {
		return api.get("/users/me");
	};

	const patchMe = (PatchMeRequest: PatchMeRequest) => {
		return api.patch("/users/me", PatchMeRequest);
	};

	return { getUserDetails, me, patchMe };
};

export default useService;
