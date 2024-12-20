import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useMediaQuery, useTheme, styled, Button, colors } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { deepPurple, grey } from "@mui/material/colors";

interface CustomImageProps {
  src: string;
  alt?: string;
  sx?: React.CSSProperties;
}

const StyledImg = styled("img")({});

const Logo: React.FC<CustomImageProps> = ({ src, alt, sx }) => {
  return <StyledImg src={src} alt={alt} style={sx} />;
};

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: grey[300],
      color: grey[800],
    },
    children: `${name.split(" ")[0][0].toUpperCase()}${name
      .split(" ")[1][0]
      .toUpperCase()}`,
  };
}

function Navbar(props: any) {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <Logo
                src={`${process.env.PUBLIC_URL}/logo.svg`}
                alt="OTOSAMOCHÓD"
                sx={{
                  width: "50px",
                  height: "50px",
                  marginRight: theme.spacing(1),
                }}
              />
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
            </Link>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button color="inherit" onClick={() => navigate("add-car")}>
              Dodaj ogłoszenie
            </Button>
            <Tooltip title="Profil">
              <IconButton
                sx={{ p: 0, mr: 1 }}
                onClick={() => navigate("/user-details")}
              >
                <Avatar
                  {...stringAvatar(`${user?.name} ${user?.surname}`)}
                ></Avatar>
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
