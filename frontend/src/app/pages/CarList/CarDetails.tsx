import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import useService from "../useService";
import { Car } from "../../../types/car";

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getCarById } = useService();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleNextImage = () => {
    if (car && car.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car.images.length);
    }
  };

  const handlePreviousImage = () => {
    if (car && car.images.length > 0) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + car.images.length) % car.images.length
      );
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

  if (!car) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="textSecondary">
          Nie znaleziono szczegółów samochodu.
        </Typography>
      </Box>
    );
  }

  const currentImage = car.images[currentImageIndex]?.contentUrl
    ? "http://localhost:8080" + car.images[currentImageIndex].contentUrl
    : "https://via.placeholder.com/300";

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", mt: 4 }}>
      <Card>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 300,
            backgroundColor: "#f5f5f5",
          }}
        >
          <IconButton
            onClick={handlePreviousImage}
            sx={{
              position: "absolute",
              left: 16,
              zIndex: 10,
              backgroundColor: "white",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            <ArrowBackIos />
          </IconButton>
          <img
            src={currentImage}
            alt={`Car image ${currentImageIndex + 1}`}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "cover",
            }}
          />
          <IconButton
            onClick={handleNextImage}
            sx={{
              position: "absolute",
              right: 16,
              zIndex: 10,
              backgroundColor: "white",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {car.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Marka:</strong> {car.brand}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Model:</strong> {car.model}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Rocznik :</strong> {car.year}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Przebieg:</strong> {car.mileage} km
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Typ paliwa:</strong> {car.fuelType}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Cena:</strong> ${car.price}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Lokalizacja:</strong> {car.location}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Opis:</strong> {car.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CarDetails;
