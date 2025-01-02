import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Main from "./modules/Dashboard/Dashboard";
import Error from "./pages/Error/Error";
import Login from "./pages/Login/Login";
import AddCar from "./pages/AddCar/AddCar";
import Register from "./pages/Register/Register";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import { useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./systems/ProtectedRoute";
import UserDetails from "./modules/Settings/UserDetails";
import Layout from "./pages/Portal/Layout";
import CarDetails from "./pages/CarList/CarDetails";

const Routes = () => {
  const authenticatedRoutes = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Layout />,
          children: [
            { path: "/", element: <Main /> },
            //{ path: "/my-listings", element: <MyListings /> },
            //{ path: "/listings", element: <Listings /> },
            { path: "/add-car", element: <AddCar /> },
            { path: "/user-details", element: <UserDetails /> },
            { path: "/cars/:id", element: <CarDetails /> },
          ],
        },
      ],
    },
  ];

  const publicRoutes = [
    {
      path: "*",
      element: <Error />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/register",
      element: <Register />,
    },
    {
      path: "/auth/change-password",
      element: <ChangePassword />,
    },
  ];

  const auth = useAuth();

  const router = createBrowserRouter([...publicRoutes, ...authenticatedRoutes]);

  return <RouterProvider router={router} />;
};

export default Routes;
