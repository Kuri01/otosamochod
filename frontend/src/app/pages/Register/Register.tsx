import {
	Box,
	Button,
	Grid,
	TextField,
	Typography,
	useTheme
} from "@mui/material";
import { PaperStyled } from "../Login/Login";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import useService from "../useService";
import { useAlert } from "../../systems/useAlert";

interface FormValues {
	name: string;
	surname: string;
	phone: string;
	email: string;
	password: string;
	re_password: string;
}

const initialValues: FormValues = {
	name: "",
	surname: "",
	phone: "",
	email: "",
	password: "",
	re_password: ""
};

const validate = (values: FormValues) => {
	const errors: Partial<FormValues> = {};

	if (!values.name) {
		errors.name = "Imię jest wymagane";
	}

	if (!values.surname) {
		errors.surname = "Nazwisko jest wymagane";
	}

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

	if (!values.phone) {
		errors.phone = "Numer telefonu jest wymagany";
	} else if (!/^\d{9}$/i.test(values.phone)) {
		errors.phone = "Niepoprawny numer telefonu";
	}
	return errors;
};

export default function Register() {
	const theme = useTheme();
	const navigate = useNavigate();
	const Service = useService();
	const { showAlert } = useAlert();

	const handleSubmit = async (values: FormValues, { resetForm }: any) => {
		const RegisterData = {
			name: values.name,
			surname: values.surname,
			email: values.email,
			plainPassword: values.password,
			phone: values.phone
		};

		Service.register(RegisterData)
			.then(() => {
				showAlert("Zarejestrowano pomyślnie", "success");
				resetForm();
				navigate("/auth/login");
			})
			.catch(() => {
				showAlert("Nie udało się zarejestrować", "error");
			});
	};

	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			justifyContent={"center"}
			alignItems={"center"}
			height={"100%"}
		>
			<div>
				<Typography
					variant="h2"
					gutterBottom
					textAlign="center"
					color={theme.palette.primary.main}
					fontWeight={"bold"}
				>
					otoSamochód.pl
				</Typography>
			</div>
			<PaperStyled
				elevation={6}
				style={{ width: "600px", padding: "1rem 5rem" }}
			>
				<Formik
					initialValues={initialValues}
					validate={validate}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Typography
										variant="subtitle1"
										gutterBottom
										fontWeight={"bolder"}
									>
										Imię
									</Typography>
									<Field
										as={TextField}
										fullWidth
										name="name"
										placeholder="Wpisz imię"
										autoComplete="name"
									/>
									<ErrorMessage name="name" component="div" />
								</Grid>
								<Grid item xs={12}>
									<Typography
										variant="subtitle1"
										gutterBottom
										fontWeight={"bolder"}
									>
										Nazwisko
									</Typography>
									<Field
										as={TextField}
										fullWidth
										name="surname"
										placeholder="Wpisz nazwisko"
										autoComplete="surname"
									/>
									<ErrorMessage name="surname" component="div" />
								</Grid>
								<Grid item xs={12}>
									<Typography
										variant="subtitle1"
										gutterBottom
										fontWeight={"bolder"}
									>
										Email
									</Typography>
									<Field
										as={TextField}
										fullWidth
										name="email"
										placeholder="Wpisz email"
										autoComplete="email"
									/>
									<ErrorMessage name="email" component="div" />
								</Grid>
								<Grid item xs={12}>
									<Typography
										variant="subtitle1"
										gutterBottom
										fontWeight={"bolder"}
									>
										Numer telefonu
									</Typography>
									<Field
										as={TextField}
										fullWidth
										name="phone"
										placeholder="Wpisz numer telefonu"
										autoComplete="phone"
									/>
									<ErrorMessage name="phone" component="div" />
								</Grid>
								<Grid item xs={12}>
									<Typography
										variant="subtitle1"
										gutterBottom
										fontWeight={"bolder"}
									>
										Hasło
									</Typography>
									<Field
										as={TextField}
										fullWidth
										type="password"
										name="password"
										placeholder="Wpisz hasło"
										autoComplete="password"
									/>
									<ErrorMessage name="password" component="div" />
								</Grid>
								<Grid item xs={12}>
									<Typography
										variant="subtitle1"
										gutterBottom
										fontWeight={"bolder"}
									>
										Potwierdź hasło
									</Typography>
									<Field
										as={TextField}
										fullWidth
										type="password"
										name="re_password"
										placeholder="Wpisz hasło"
										autoComplete="re_password"
									/>
									<ErrorMessage name="re_password" component="div" />
								</Grid>
								<Grid item xs={12}>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										fullWidth
										disabled={isSubmitting}
									>
										{isSubmitting ? "Rejestrowanie..." : "Utwórz konto"}
									</Button>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
				<p
					style={{
						display: "flex",
						justifyContent: "center",
						color: theme.palette.info.light
					}}
				>
					Masz już konto?&nbsp;&nbsp;&nbsp;
					<Link
						to="/auth/login"
						style={{
							textDecoration: "none",
							color: theme.palette.secondary.main
						}}
					>
						Zaloguj się
					</Link>
				</p>
			</PaperStyled>
		</Box>
	);
}
