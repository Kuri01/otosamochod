import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import useService from "../../pages/useService";
import { Car } from "../../../types/car";

const MyListings: React.FC = () => {
  const { getUserCars, deleteCar } = useService();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCars = async () => {
      try {
        setLoading(true);
        const response = await getUserCars(1);
        setCars(response);
      } catch (err) {
        setError("Nie udało się załadować ogłoszeń.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCars();
  }, []);

  const handleDelete = async (id: number | unknown) => {
    if (!window.confirm("Czy na pewno chcesz usunąć to ogłoszenie?")) return;
    if (typeof id !== "number") {
      console.error("Invalid ID: must be a number");
      return;
    }

    try {
      await deleteCar(id);
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    } catch (err) {
      console.error(`Nie udało się usunąć ogłoszenia o ID ${id}:`, err);
      alert("Nie udało się usunąć ogłoszenia. Spróbuj ponownie.");
    }
  };

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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Moje ogłoszenia
      </Typography>

      {cars.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Nie masz jeszcze żadnych ogłoszeń.
        </Typography>
      )}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {cars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxShadow: 1,
                borderRadius: 2,
              }}
            >
              <Link
                to={`/CarDetails/${car.id}`}
                style={{ textDecoration: "none", flex: 1 }}
              >
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
                    <strong>Price:</strong> ${car.price}
                  </Typography>
                </CardContent>
              </Link>
              <CardMedia
                component="img"
                sx={{ width: "100%", height: 150, objectFit: "cover" }}
                image={car.images[0] || "https://via.placeholder.com/150"}
                alt={car.title}
              />
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(car.id)}
                sx={{ m: 1 }}
              >
                Usuń ogłoszenie
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyListings;
