import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Grid2 } from "@mui/material";
import "./baner.css";

export default function Banner() {
  return (
		<Paper style={{display:'flex', marginTop:'1rem',  overflow:'hidden', justifyContent:'space-between'}} >
			<Grid2 className="banner-left">
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

			<img src="/baner2.webp" alt="Banner"  width={'50%'}  height={'auto'}/>
		</Paper>
	);
}
