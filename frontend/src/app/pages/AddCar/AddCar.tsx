import React, { useState } from "react";
import useService from "../useService";
import {
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Car } from "../../../types/car";

const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
const transmissions = ["Manual", "Automatic"];
const bodyTypes = ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible"];
const conditions = ["New", "Used"];

const AddCar: React.FC = () => {
  const { addCar } = useService();

  const [formData, setFormData] = useState<Car>({
    title: "",
    description: "",
    price: 0,
    brand: "",
    model: "",
    year: 0,
    mileage: 0,
    fuelType: "",
    transmission: "",
    bodyType: "",
    color: "",
    engineSize: 0,
    horsePower: 0,
    numberOfDoors: 0,
    condition: "",
    location: "",
    isSold: false,
    sellerContact: "",
    vin: "",
    images: [],
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // Podgląd zdjęć

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);

      // Generowanie podglądów
      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await addCar(formData, images); // Przekazujemy dane i zdjęcia
      console.log("Sukces:", response);
      alert("Ogłoszenie zostało dodane!");
      setFormData({
        title: "",
        description: "",
        price: 0,
        brand: "",
        model: "",
        year: 0,
        mileage: 0,
        fuelType: "",
        transmission: "",
        bodyType: "",
        color: "",
        engineSize: 0,
        horsePower: 0,
        numberOfDoors: 0,
        condition: "",
        location: "",
        isSold: false,
        sellerContact: "",
        vin: "",
        images: [],
      });
      setImages([]);
      setPreviewUrls([]);
    } catch (error) {
      console.error("Błąd:", error);
      alert("Wystąpił błąd podczas dodawania ogłoszenia.");
    }
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Dodaj Ogłoszenie
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Tytuł"
          name="title"
          margin="normal"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Opis"
          name="description"
          margin="normal"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
          required
        />
        <TextField
          fullWidth
          label="Cena"
          name="price"
          margin="normal"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Marka"
          name="brand"
          margin="normal"
          value={formData.brand}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Model"
          name="model"
          margin="normal"
          value={formData.model}
          onChange={handleChange}
          required
        />
        <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
          Dodaj zdjęcia samochodu:
        </Typography>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
          {previewUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Preview ${index + 1}`}
              style={{ width: 100, height: 100, objectFit: "cover" }}
            />
          ))}
        </Box>

        <TextField
          fullWidth
          label="Rok produkcji"
          name="year"
          margin="normal"
          type="number"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Przebieg (km)"
          name="mileage"
          margin="normal"
          type="number"
          value={formData.mileage}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Kontakt"
          name="sellerContact"
          margin="normal"
          value={formData.sellerContact}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="VIN"
          name="vin"
          margin="normal"
          value={formData.vin}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Lokalizacja"
          name="location"
          margin="normal"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <TextField
          select
          fullWidth
          label="Rodzaj paliwa"
          name="fuelType"
          margin="normal"
          value={formData.fuelType}
          onChange={handleChange}
          required
        >
          {fuelTypes.map((fuel) => (
            <MenuItem key={fuel} value={fuel}>
              {fuel}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          label="Skrzynia biegów"
          name="transmission"
          margin="normal"
          value={formData.transmission}
          onChange={handleChange}
          required
        >
          {transmissions.map((trans) => (
            <MenuItem key={trans} value={trans}>
              {trans}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          label="Typ nadwozia"
          name="bodyType"
          margin="normal"
          value={formData.bodyType}
          onChange={handleChange}
          required
        >
          {bodyTypes.map((body) => (
            <MenuItem key={body} value={body}>
              {body}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          label="Stan"
          name="condition"
          margin="normal"
          value={formData.condition}
          onChange={handleChange}
          required
        >
          {conditions.map((cond) => (
            <MenuItem key={cond} value={cond}>
              {cond}
            </MenuItem>
          ))}
        </TextField>

        {/* Liczbowe pola */}
        <TextField
          fullWidth
          label="Pojemność silnika (cm³)"
          name="engineSize"
          margin="normal"
          type="number"
          value={formData.engineSize}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Moc (KM)"
          name="horsePower"
          margin="normal"
          type="number"
          value={formData.horsePower}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Liczba drzwi"
          name="numberOfDoors"
          margin="normal"
          type="number"
          value={formData.numberOfDoors}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Dodaj ogłoszenie
        </Button>
      </form>
    </Box>
  );
};

export default AddCar;
