import {
	createBrowserRouter,
	Navigate,
	redirect,
	RouterProvider
} from "react-router-dom";
import Main from "./modules/Dashboard/Dashboard";
import Error from "./pages/Error/Error";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import { useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./systems/ProtectedRoute";
import UserDetails from "./modules/Settings/UserDetails";
import Layout from "./pages/Portal/Layout";
import path from "path";
import Home from "./modules/Home/Home";

const Routes = () => {
	const authenticatedRoutes = [
		{
			path: "/",
			element: <ProtectedRoute />,
			children: [
				{
					path: "/",
					element: <Layout />, // Wrap main components with the layout
					children: [
						{ path: "/", element: <Main /> },
						{ path: "/user-details", element: <UserDetails /> },
						{ path: "/home", element: <Home /> }
					]
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

	const router = createBrowserRouter([
		...publicRoutes,
		...(!auth?.token ? [] : authenticatedRoutes)
	]);

	return <RouterProvider router={router} />;
};

export default Routes;
