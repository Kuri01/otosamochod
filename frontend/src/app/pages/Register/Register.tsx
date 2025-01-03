import { Box, Button, styled, TextField, Typography, useTheme, Grid, Checkbox } from "@mui/material";
import { PaperStyled } from "../Login/Login";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import useService from "../useService";
import { useAlert } from "../../systems/useAlert";
import { red } from "@mui/material/colors";

interface FormValues {
	name: string;
	surname: string;
	phone: string;
	email: string;
	password: string;
	re_password: string;
	checkbox: boolean;
}

const initialValues: FormValues = {
	name: "",
	surname: "",
	phone: "",
	email: "",
	password: "",
	re_password: "",
	checkbox: false,
};

const StyledErrorMessage = styled(ErrorMessage)({
	color: red[600],
	position: "absolute",
	marginTop: "4px",
});

const StyledGrid = styled(Grid)({
	padding: 0,
	marginTop: "1rem",
	"& .MuiGrid-item": {
		paddingTop: "1rem",
		paddingLeft: 0,
	},
});

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

	if (values.checkbox == false) {
		errors.checkbox = false;
	}

	return errors;
};

export default function Register() {
	const theme = useTheme();
	const navigate = useNavigate();
	const Service = useService();
	const { showAlert } = useAlert();

	const handleSubmit = (values: FormValues, { resetForm, setSubmitting }: any) => {
		const RegisterData = {
			name: values.name,
			surname: values.surname,
			email: values.email,
			plainPassword: values.password,
			phone: values.phone,
		};

		Service.register(RegisterData)
			.then(() => {
				showAlert("Zarejestrowano pomyślnie", "success");
				resetForm();
				navigate("/auth/login");
			})
			.catch(() => {
				showAlert("Nie udało się zarejestrować", "error");
			})
			.finally(() => {
				setSubmitting(false);
			});
	};

	return (
		<Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
			<div>
				<Typography variant="h2" gutterBottom textAlign="center" color={theme.palette.primary.main} fontWeight={"bold"}>
					otoSamochód.pl
				</Typography>
			</div>
			<PaperStyled elevation={6} style={{ width: "600px", padding: "1rem 5rem" }}>
				<Typography variant="h4" gutterBottom textAlign="center" fontWeight={"bold"} padding={"2rem"}>
					Rejestracja
				</Typography>
				<Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
					{({ isSubmitting }) => (
						<Form>
							<StyledGrid container spacing={2}>
								<StyledGrid item xs={12}>
									<Typography variant="subtitle1" gutterBottom fontWeight={"bolder"}>
										Imię
									</Typography>
									<Field as={TextField} fullWidth name="name" placeholder="Wpisz imię" autoComplete="name" />
									<StyledErrorMessage name="name" component="div" />
								</StyledGrid>
								<StyledGrid item xs={12}>
									<Typography variant="subtitle1" gutterBottom fontWeight={"bolder"}>
										Nazwisko
									</Typography>
									<Field as={TextField} fullWidth name="surname" placeholder="Wpisz nazwisko" autoComplete="surname" />
									<StyledErrorMessage name="surname" component="div" />
								</StyledGrid>
								<StyledGrid item xs={12}>
									<Typography variant="subtitle1" gutterBottom fontWeight={"bolder"}>
										Email
									</Typography>
									<Field as={TextField} fullWidth name="email" placeholder="Wpisz email" autoComplete="email" />
									<StyledErrorMessage name="email" component="div" />
								</StyledGrid>
								<StyledGrid item xs={12}>
									<Typography variant="subtitle1" gutterBottom fontWeight={"bolder"}>
										Numer telefonu
									</Typography>
									<Field as={TextField} fullWidth name="phone" placeholder="Wpisz numer telefonu" autoComplete="phone" />
									<StyledErrorMessage name="phone" component="div" />
								</StyledGrid>
								<StyledGrid item xs={12}>
									<Typography variant="subtitle1" gutterBottom fontWeight={"bolder"}>
										Hasło
									</Typography>
									<Field as={TextField} fullWidth type="password" name="password" placeholder="Wpisz hasło" autoComplete="password" />
									<StyledErrorMessage name="password" component="div" />
								</StyledGrid>
								<StyledGrid item xs={12}>
									<Typography variant="subtitle1" gutterBottom fontWeight={"bolder"}>
										Potwierdź hasło
									</Typography>
									<Field as={TextField} fullWidth type="password" name="re_password" placeholder="Wpisz hasło" autoComplete="re_password" />
									<StyledErrorMessage name="re_password" component="div" />
								</StyledGrid>
								<StyledGrid item xs={12} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
									<Typography variant="subtitle1" gutterBottom fontWeight={"bolder"}>
										Potwierdź regularmin
									</Typography>
									<Field as={Checkbox} fullWidth type="checkbox" name="checkbox" />
								</StyledGrid>
								<StyledGrid item xs={12}>
									<Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
										{isSubmitting ? "Rejestrowanie..." : "Utwórz konto"}
									</Button>
								</StyledGrid>
							</StyledGrid>
						</Form>
					)}
				</Formik>
				<p
					style={{
						display: "flex",
						justifyContent: "center",
						color: theme.palette.info.light,
					}}
				>
					Masz już konto?&nbsp;&nbsp;&nbsp;
					<Link
						to="/auth/login"
						style={{
							textDecoration: "none",
							color: theme.palette.secondary.main,
						}}
					>
						Zaloguj się
					</Link>
				</p>
			</PaperStyled>
		</Box>
	);
}

export { StyledErrorMessage, StyledGrid };
