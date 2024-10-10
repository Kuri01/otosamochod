import { Box, Button, Grid, TextField, Typography, useTheme } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PaperStyled } from "../Login/Login";
import { Link } from "react-router-dom";

interface FormValues {
	email: string;
}

const initialValues: FormValues = {
	email: ""
};

const validate = (values: FormValues) => {
	const errors: Partial<FormValues> = {};

	if (!values.email) {
		errors.email = "Email jest wymagany";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = "Niepoprawny adres email";
	}

	return errors;
};

export default function ChangePassword() {
	const theme = useTheme();

	const handleSubmit = (values: FormValues) => {
		console.log("Form values: ", values);
		alert("Reset hasła!");
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
					Zapomniałeś hasła?
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
									<Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
										{isSubmitting ? "Wysyłanie przypomnienia..." : "Przypomnij hasło"}
									</Button>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
				<p style={{ display: "flex", justifyContent: "center", color: theme.palette.info.light }}>
					Znasz hasło?&nbsp;&nbsp;&nbsp;
					<Link to="/auth/login" style={{ textDecoration: "none", color: theme.palette.secondary.main }}>
						Zaloguj się
					</Link>
				</p>
			</PaperStyled>
		</Box>
	);
}
