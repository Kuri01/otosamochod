import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Container } from "@mui/material";
import Footer from "./Footer";

import "./Layout.css";

export default function Layout() {
	return (
		<div className="layout">
			<NavBar />
			<main>
				<Container maxWidth="xl">
					<Outlet />
				</Container>
			</main>
			<Footer />
		</div>
	);
}
