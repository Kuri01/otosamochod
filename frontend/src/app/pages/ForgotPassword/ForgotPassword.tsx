import React from "react";
import { Button, Typography, Paper, Box, styled, useTheme, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useService, { ChangePassword } from "../useService";
import { useAlert } from "../../systems/useAlert";
import { StyledErrorMessage, StyledGrid } from "../Register/Register";
import { useParams } from "react-router-dom";
import { PaperStyled } from "../Login/Login";

interface FormValues {
	password: string;
}

const initialValues: FormValues = {
	password: "",
};

const validate = (values: FormValues) => {
	const errors: Partial<FormValues> = {};

	if (!values.password) {
		errors.password = "Hasło jest wymagane";
	}

	return errors;
};

const ForgotPassword = () => {
	const { key } = useParams();
	const theme = useTheme();
	const Service = useService();
	const navigate = useNavigate();
	const auth = useAuth();
	const alert = useAlert();

	const handleSubmit = (values: FormValues, { setSubmitting }: any) => {
		const data = {
			password: values.password,
			token: key,
		};

		if (key == null || key == undefined) alert.showAlert("Niepoprawny klucz zmiany hasła", "error");

		Service.changePassword(data)
			.then((response) => {
				alert.showAlert("Hasło zmienione pomyślnie", "success");
				navigate("/");
			})
			.catch(() => {
				alert.showAlert("Niepoprawny klucz zmiany hasła", "error");
			})
			.finally(() => {
				setSubmitting(false);
			});
	};

	return (
		<div>
			<Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
				<div>
					<Typography variant="h2" gutterBottom textAlign="center" color={theme.palette.primary.main} fontWeight={"bold"}>
						otoSamochód.pl
					</Typography>
				</div>
				<PaperStyled elevation={6} style={{ width: "600px", padding: "1rem 5rem" }}>
					<Typography variant="h4" gutterBottom textAlign="center" fontWeight={"bold"} padding={"2rem"}>
						Ustaw nowe hasło
					</Typography>
					<Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
						{({ isSubmitting }) => (
							<Form>
								<StyledGrid container spacing={3}>
									<StyledGrid item xs={12}>
										<div style={{ display: "flex", justifyContent: "space-between" }}>
											<Typography variant="subtitle1" gutterBottom fontWeight={"bolder"}>
												Hasło
											</Typography>
											<Link
												to="/auth/login"
												style={{
													textDecoration: "none",
													color: theme.palette.secondary.main,
												}}
											>
												Powrót
											</Link>
										</div>
										<Field as={TextField} fullWidth type="password" name="password" placeholder="Wpisz hasło" autoComplete="current-password" />
										<StyledErrorMessage name="password" component="div" />
									</StyledGrid>

									<StyledGrid item xs={12}>
										<Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
											{isSubmitting ? "Ładowanie..." : "Ustaw nowe hasło"}
										</Button>
									</StyledGrid>
								</StyledGrid>
							</Form>
						)}
					</Formik>
				</PaperStyled>
			</Box>
		</div>
	);
};

export default ForgotPassword;
