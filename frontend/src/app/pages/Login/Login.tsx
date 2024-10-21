import React from "react";
import { Button, Input, Grid, Typography, Paper, Box, styled, useTheme, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface FormValues {
	email: string;
	password: string;
}

const initialValues: FormValues = {
	email: "",
	password: ""
};

const validate = (values: FormValues) => {
	const errors: Partial<FormValues> = {};

	if (!values.email) {
		errors.email = "Email jest wymagany";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = "Niepoprawny adres email";
	}

	if (!values.password) {
		errors.password = "Hasło jest wymagane";
	}

	return errors;
};

const PaperStyled = styled(Paper)`
	padding: 20px;
	margin: 20px;
	border-radius: 1rem;
`;

const Login: React.FC = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const auth = useAuth();
	const handleSubmit = (values: FormValues) => {
		auth?.login();
		navigate("/");
	};

	return (
		<Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
			<div>
				<Typography variant="h2" gutterBottom textAlign="center" color={theme.palette.primary.main} fontWeight={"bold"}>
					otoSamochód.pl
				</Typography>
			</div>
			<PaperStyled elevation={6} style={{ width: "600px", padding: "1rem 5rem" }}>
				<Typography variant="h4" gutterBottom textAlign="center" fontWeight={"bold"} padding={"2rem"}>
					Zaloguj się
				</Typography>
				<Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
					{({ isSubmitting }) => (
						<Form>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<Typography variant="subtitle1" gutterBottom fontWeight={"bolder"}>
										E-mail
									</Typography>
									<Field as={TextField} fullWidth type="email" name="email" placeholder="qaz123@gmail.com" autoComplete="email" />
								</Grid>

								<Grid item xs={12}>
									<div style={{ display: "flex", justifyContent: "space-between" }}>
										<Typography variant="subtitle1" gutterBottom fontWeight={"bolder"}>
											Hasło
										</Typography>
										<Link to="/auth/change-password" style={{ textDecoration: "none", color: theme.palette.secondary.main }}>
											Zapomniałeś hasła?
										</Link>
									</div>
									<Field as={TextField} fullWidth type="password" name="password" placeholder="Wpisz hasło" autoComplete="current-password" />
								</Grid>

								<Grid item xs={12}>
									<Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
										{isSubmitting ? "Logowanie..." : "Zaloguj"}
									</Button>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
				<p style={{ display: "flex", justifyContent: "center", color: theme.palette.info.light }}>
					Nie masz konta?&nbsp;&nbsp;&nbsp;
					<Link to="/auth/register" style={{ textDecoration: "none", color: theme.palette.secondary.main }}>
						Zarejestruj się
					</Link>
				</p>
			</PaperStyled>
		</Box>
	);
};

export default Login;
export { PaperStyled };
