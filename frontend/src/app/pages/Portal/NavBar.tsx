import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useMediaQuery, useTheme, styled, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

interface CustomImageProps {
	src: string;
	alt?: string;
	sx?: React.CSSProperties;
}

const StyledImg = styled("img")({});

const Logo: React.FC<CustomImageProps> = ({ src, alt, sx }) => {
	return <StyledImg src={src} alt={alt} style={sx} />;
};

function Navbar(props: any) {
	const navigate = useNavigate();
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
						<Link to="/">
							<Logo
								src={`${process.env.PUBLIC_URL}/logo.svg`}
								alt="OTOSAMOCHÓD"
								sx={{
									width: "50px",
									height: "50px",
									marginRight: theme.spacing(1),
								}}
							/>
						</Link>
						{!isMatch && (
							<Typography
								variant="h6"
								noWrap
								sx={{
									fontFamily: "monospace",
									fontWeight: 700,
									letterSpacing: ".3rem",
									color: "inherit",
									textDecoration: "none",
								}}
							>
								Otosamochód
							</Typography>
						)}
					</Box>
					<Box sx={{ display: "flex", alignItems: "center" }}>
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
								aria-label="logout"
								size="medium"
								color="inherit"
								sx={{
									border: "1px solid",
									borderColor: "currentColor",
									borderRadius: "50%",
								}}
								onClick={() => {
									localStorage.removeItem("token");
									window.location.href = "/auth/login";
								}}
							>
								<Logout fontSize="inherit" />
							</IconButton>
						</Tooltip>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Navbar;
