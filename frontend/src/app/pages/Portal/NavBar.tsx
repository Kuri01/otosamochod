import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { styled, SxProps, Theme } from "@mui/material";
import { Link } from "react-router-dom";

const pages = ["Kup teraz", "Aukcje"];

function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	interface CustomImageProps {
		src: string;
		alt?: string;
		sx?: SxProps<Theme>;
	}

	const StyledImg = styled("img")({});

	const Logo: React.FC<CustomImageProps> = ({ src, alt, sx }) => {
		return <StyledImg src={src} alt={alt} style={sx as React.CSSProperties} />;
	};
	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
						<Logo src={`${process.env.PUBLIC_URL}/logo.svg`} alt="OTOSAMOCHÓD" sx={{ width: "80px", height: "auto" }} />
					</Box>

					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none"
						}}
					>
						OTOSAMOCHÓD
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left"
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left"
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: "block", md: "none" } }}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography sx={{ textAlign: "center" }}>{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
						<Logo src={`${process.env.PUBLIC_URL}/logo.svg`} alt="OTOSAMOCHÓD" sx={{ width: "80px", height: "auto" }} />
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none"
						}}
					>
						OTOSAMOCHÓD
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
								{page}
							</Button>
						))}
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right"
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right"
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<Link to={"/user-details"} color="inherit">
								<MenuItem>
									<Typography sx={{ textAlign: "center" }}>Szczegóły</Typography>
								</MenuItem>
							</Link>
							<Link
								to={"/auth/login"}
								color="inherit"
								onClick={() => {
									localStorage.clear();
								}}
							>
								<MenuItem>
									<Typography sx={{ textAlign: "center" }}>Wyloguj</Typography>
								</MenuItem>
							</Link>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
