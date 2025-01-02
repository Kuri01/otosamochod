import React from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Grid2 } from "@mui/material";
import "./baner.css";

export default function Banner() {
  return (
    <Grid2 container className="banner-container">
      <Grid2 columns={12} sx={{ height: "100vh" }} className="banner-left">
        <Typography variant="h3" gutterBottom>
          Najlepszy market w Polsce
        </Typography>
        <Typography variant="h6" paragraph>
          Handluj razem z nami!
        </Typography>
        <Link to="/add-car">
          <Button variant="contained" color="primary" className="bigger-button">
            Kliknij tutaj
          </Button>
        </Link>
      </Grid2>

      <Grid2
        columns={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
        className="banner-right"
      >
        <img src="/baner2.webp" alt="Banner" className="banner-image" />
      </Grid2>
    </Grid2>
  );
}
