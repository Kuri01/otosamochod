import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CircularProgress, Box, Grid, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import useService from "../useService";
import { Car } from "../../../types/car";

const CarList: React.FC = () => {
	const { getCars } = useService();
	const [cars, setCars] = useState<Car[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchCars = async (page: number) => {
		try {
			setLoading(true);
			const response = await getCars(page);
			setCars(() => [...response]);
		} catch (error) {
			console.error("Błąd przy pobieraniu samochodów", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCars(1);
	}, []);

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" component="h1" gutterBottom>
				Lista samochodów
			</Typography>

			{loading && (
				<Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
					<CircularProgress />
				</Box>
			)}

			{!loading && cars.length === 0 && (
				<Typography variant="body1" sx={{ mt: 2 }}>
					Brak samochodów do wyświetlenia.
				</Typography>
			)}

			<Grid container spacing={3} sx={{ mt: 2 }}>
				{cars.map((car) => {
					const previewImage = car.images[0]?.contentUrl ? "http://localhost:8080" + car.images[0].contentUrl : "https://via.placeholder.com/300";

					return (
						<Grid item xs={12} sm={6} md={4} key={car.id}>
							<Link to={`/cars/${car.id}`} style={{ textDecoration: "none" }}>
								<Card
									sx={{
										display: "flex",
										flexDirection: "row",
										height: "100%",
										boxShadow: 1,
										borderRadius: 2,
										cursor: "pointer",
									}}
								>
									<Box sx={{ flex: 1 }}>
										<CardContent>
											<Typography variant="h6" component="h2" gutterBottom>
												{car.title}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												<strong>Brand:</strong> {car.brand}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												<strong>Model:</strong> {car.model}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												<strong>Year:</strong> {car.year}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												<strong>Mileage:</strong> {car.mileage} km
											</Typography>
											<Typography variant="body2" color="text.secondary">
												<strong>Fuel Type:</strong> {car.fuelType}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												<strong>Location:</strong> {car.location}
											</Typography>
										</CardContent>
									</Box>

									<CardMedia
										component="img"
										sx={{ width: 150, objectFit: "cover" }}
										image={previewImage} // Placeholder, jeśli brak obrazu
										alt={car.title}
									/>
								</Card>
							</Link>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
};

export default CarList;
