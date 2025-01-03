import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Container, CssBaseline } from "@mui/material";
import Footer from "./Footer";

export default function Layout() {
	return (
		<>
			<NavBar />
			<main>
				<Container maxWidth="xl"  style={{minWidth:'800px'}}>
					<Outlet />
				</Container>
			</main>

			<footer>
				<Footer />
			</footer>
		</>
	);
}
