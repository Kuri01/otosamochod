import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Container, CssBaseline } from "@mui/material";
import Footer from "./Footer";

export default function Layout() {
	return (
		<>
			<NavBar />
			<main>
				<Container maxWidth="xl">
					<Outlet />
				</Container>
			</main>

			<footer>
				<Footer />
			</footer>
		</>
	);
}
