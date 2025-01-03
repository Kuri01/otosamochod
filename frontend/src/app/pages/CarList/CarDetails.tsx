import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import useService from "../useService";
import { Car } from "../../../types/car";

const CarDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { getCarById } = useService();
	const [car, setCar] = useState<Car | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCar = async () => {
			try {
				setLoading(true);
				const fetchedCar = await getCarById(Number(id));
				setCar(fetchedCar);
			} catch (err) {
				setError("Nie udało się załadować szczegółów samochodu.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchCar();
		}
	}, [id]);

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={{ textAlign: "center", mt: 4 }}>
				<Typography variant="h6" color="error">
					{error}
				</Typography>
			</Box>
		);
	}

	if (!car) {
		return (
			<Box sx={{ textAlign: "center", mt: 4 }}>
				<Typography variant="h6" color="textSecondary">
					Nie znaleziono szczegółów samochodu.
				</Typography>
			</Box>
		);
	}

	const previewImage = car.images[0]?.contentUrl ? "http://localhost:8080" + car.images[0].contentUrl : "https://via.placeholder.com/300";
  
	return (
		<Box sx={{ maxWidth: 800, margin: "0 auto", mt: 4 }}>
			<Card>
				<CardMedia component="img" height="300" image={previewImage} alt={car.title} />
				<CardContent>
					<Typography variant="h4" gutterBottom>
						{car.title}
					</Typography>
					<Typography variant="body1" gutterBottom>
						<strong>Brand:</strong> {car.brand}
					</Typography>
					<Typography variant="body1" gutterBottom>
						<strong>Model:</strong> {car.model}
					</Typography>
					<Typography variant="body1" gutterBottom>
						<strong>Year:</strong> {car.year}
					</Typography>
					<Typography variant="body1" gutterBottom>
						<strong>Mileage:</strong> {car.mileage} km
					</Typography>
					<Typography variant="body1" gutterBottom>
						<strong>Fuel Type:</strong> {car.fuelType}
					</Typography>
					<Typography variant="body1" gutterBottom>
						<strong>Price:</strong> ${car.price}
					</Typography>
					<Typography variant="body1" gutterBottom>
						<strong>Location:</strong> {car.location}
					</Typography>
					<Typography variant="body1" gutterBottom>
						<strong>Description:</strong> {car.description}
					</Typography>
				</CardContent>
			</Card>
		</Box>
	);
};

export default CarDetails;
