import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
	const auth = useAuth();

	if (!auth?.token) {
		return <Navigate to="/auth/login" />;
	}

	return <Outlet />;
};
