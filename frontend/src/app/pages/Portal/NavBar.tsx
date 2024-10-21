import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import {
	Tabs,
	Tab,
	useMediaQuery,
	useTheme,
	SxProps,
	Theme,
	styled,
	Button
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TimelineIcon from "@mui/icons-material/Timeline";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import PersonIcon from "@mui/icons-material/Person";
import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Home } from "@mui/icons-material";
import { Link, Navigate, useNavigate } from "react-router-dom";

import "./index.css";

interface CustomImageProps {
	src: string;
	alt?: string;
	sx?: SxProps<Theme>;
}

const StyledImg = styled("img")({});

const Logo: React.FC<CustomImageProps> = ({ src, alt, sx }) => {
	return <StyledImg src={src} alt={alt} style={sx as React.CSSProperties} />;
};

function Navbar(props: any) {
	const navigate = useNavigate();
	const handleOpenNavMenu = (event: any) => {
		setAnchorElNav(event.currentTarget);
	};
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<AppBar style={{ position: "relative" }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Link
						to={"/"}
						style={{
							textDecoration: "none",
							color: "white",
							display: "flex",
							alignItems: "center"
						}}
					>
						<Typography
							variant="h6"
							noWrap
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
								alignItems: "center"
							}}
							className="cursorp"
						>
							<Logo
								src={`${process.env.PUBLIC_URL}/logo.svg`}
								alt="OTOSAMOCHÓD"
								sx={{
									display: { xs: "none", md: "flex" },
									mr: 0.5,
									width: "50px",
									height: "50px"
								}}
							/>
							Otosamochód
						</Typography>
					</Link>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
					</Box>

					<Link to="/">
						<Typography
							variant="h5"
							noWrap
							sx={{
								mr: 2,
								display: { xs: "flex", md: "none" },
								flexGrow: 1,
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
								alignItems: "center"
							}}
						>
							<Logo
								src={`${process.env.PUBLIC_URL}/logo.svg`}
								alt="OTOSAMOCHÓD"
								sx={{
									display: { xs: "flex", md: "none" },
									mr: 0.5,
									width: "50px",
									height: "50px"
								}}
							/>
							Otosamochód
						</Typography>
					</Link>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{isMatch ? (
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
						) : (
							<>
								<Tabs centered sx={{ margin: "auto" }}>
									<Tab
										label={
											<Link
												to="/home"
												style={{
													textDecoration: "none",
													color: "white"
												}}
											>
												<Home /> Home
											</Link>
										}
										style={{
											textDecoration: "none",
											color: "white"
										}}
										className="Tab1 animate__animated animate__zoomIn"
									/>
								</Tabs>
							</>
						)}
					</Box>

					<Box sx={{ flexGrow: 0, display: "flex" }}>
						<Tooltip title="Profil">
							<IconButton
								sx={{ p: 0, mr: 1 }}
								onClick={() => navigate("/user-details")}
							>
								<Avatar>
									<PersonIcon />
								</Avatar>
							</IconButton>
						</Tooltip>
						<Tooltip title="Wyloguj">
							<IconButton
								aria-label="delete"
								size="medium"
								color="inherit"
								sx={{
									border: "1px solid",
									borderColor: "currentColor",
									borderRadius: "50%"
								}}
								onClick={() => {
									localStorage.removeItem("token");
									window.location.href = "/auth/login";
								}}
							>
								<LogoutIcon fontSize="inherit" />
							</IconButton>
						</Tooltip>

						<Menu
							id="menu-appbar-avatar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right"
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right"
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" }
							}}
						>
							<List className="DrawerList">
								<Link to="/home">
									<ListItemButton>
										<ListItemIcon>
											<Home />
										</ListItemIcon>
										<ListItemText primary={"Home"} />
									</ListItemButton>
								</Link>
							</List>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Navbar;
