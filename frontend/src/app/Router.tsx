import { createBrowserRouter, Navigate, redirect, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import { useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./systems/ProtectedRoute";
import UserDetails from "./pages/UserDetails";

const Routes = () => {
	const authenticatedRoutes = [
		{
			path: "/",
			element: <ProtectedRoute />,
			children: [
				{
					path: "/",
					element: <Main />
				},
				{
					path: "/user-details",
					element: <UserDetails />
				}
			]
		}
	];

	const publicRoutes = [
		{
			path: "*",
			element: <Error />
		},
		{
			path: "/auth/login",
			element: <Login />
		},
		{
			path: "/auth/register",
			element: <Register />
		},
		{
			path: "/auth/change-password",
			element: <ChangePassword />
		}
	];

	const auth = useAuth();

	const router = createBrowserRouter([...publicRoutes, ...(!auth?.token ? [] : authenticatedRoutes)]);

	return <RouterProvider router={router} />;
};

export default Routes;
