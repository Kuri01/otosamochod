import { Box, Button, Grid, Input, TextField, Typography, useTheme } from "@mui/material";
import { PaperStyled } from "../Login/Login";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";

interface FormValues {
	email: string;
	password: string;
	re_password: string;
}

const initialValues: FormValues = {
	email: "",
	password: "",
	re_password: ""
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

	if (values.password.length < 6) {
		errors.password = "Hasło musi mieć co najmniej 6 znaków";
	}

	if (values.password !== values.re_password) {
		errors.re_password = "Hasła nie są takie same";
	}

	return errors;
};

export default function Register() {
	const theme = useTheme();

	const handleSubmit = (values: FormValues) => {
		console.log("Form values: ", values);
		alert("Zarejestrowano!");
	};
	return (
		<Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
			<div>
				<Typography variant="h2" gutterBottom textAlign="center" color={theme.palette.primary.main} fontWeight={"bold"}>
					otoSamochód.pl
				</Typography>
			</div>{" "}
			<PaperStyled elevation={6} style={{ width: "600px", padding: "1rem 5rem" }}>
				{" "}
				<Typography variant="h4" gutterBottom textAlign="center" fontWeight={"bold"} padding={"2rem"}>
					Zarejestruj się
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
									<ErrorMessage name="email" component="div" />
								</Grid>
								<Grid item xs={12}>
									<Typography variant="subtitle1" gutterBottom fontWeight={"bolder"}>
										Hasło
									</Typography>
									<Field as={TextField} fullWidth type="password" name="password" placeholder="Wpisz hasło" autoComplete="password" />
									<ErrorMessage name="passowrd" component="div" />
								</Grid>
								<Grid item xs={12}>
									<Typography variant="subtitle1" gutterBottom fontWeight={"bolder"}>
										Potwierdź hasło
									</Typography>
									<Field as={TextField} fullWidth type="re_password" name="re_password" placeholder="Wpisz hasło" autoComplete="re_password" />
									<ErrorMessage name="re_password" component="div" />
								</Grid>
								<Grid item xs={12}>
									<Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
										{isSubmitting ? "Rejestrowanie..." : "Utwórz konto"}
									</Button>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
				<p style={{ display: "flex", justifyContent: "center", color: theme.palette.info.light }}>
					Masz już konto?&nbsp;&nbsp;&nbsp;
					<Link to="/auth/login" style={{ textDecoration: "none", color: theme.palette.secondary.main }}>
						Zaloguj się
					</Link>
				</p>
			</PaperStyled>
		</Box>
	);
}
