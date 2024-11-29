import { useEffect, useState } from "react";
import {
	Box,
	Button,
	Paper,
	TextField,
	Typography,
	CircularProgress,
	styled,
	Grid
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../systems/useAlert";
import useService from "./useService";
import { red } from "@mui/material/colors";

const StyledErrorMessage = styled(ErrorMessage)({
	color: red[600],
	position: "absolute",
	marginTop: "4px"
});

const StyledGrid = styled(Grid)({
	padding: 0,
	marginTop: "1rem",
	"& .MuiGrid-item": {
		paddingTop: "1rem",
		paddingLeft: 0
	}
});

const validate = (values: any) => {
	const errors: any = {};

	if (!values.name) {
		errors.name = "Imię jest wymagane";
	}

	if (!values.surname) {
		errors.surname = "Nazwisko jest wymagane";
	}

	if (!values.phone) {
		errors.phone = "Numer telefonu jest wymagany";
	} else if (!/^\d{9}$/i.test(values.phone)) {
		errors.phone = "Niepoprawny numer telefonu";
	}

	return errors;
};

export default function UserDetails() {
	const { user, token } = useAuth();
	const [userData, setUserData] = useState<any>(null);
	const Service = useService();
	const alert = useAlert();

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const data = await Service.me();
				setUserData(data);
			} catch (error) {
				alert.showAlert("Nie udało się pobrać danych użytkownika", "error");
			}
		};

		fetchUserDetails();
	}, []);

	const handleSubmit = async (values: any, { setSubmitting }: any) => {
		try {
			await Service.patchMe(values);
			alert.showAlert(
				"Dane użytkownika zostały zaktualizowane pomyślnie",
				"success"
			);
		} catch (error) {
			console.error("Failed to update user details", error);
			alert.showAlert(
				"Nie udało się zaktualizować danych użytkownika",
				"error"
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh"
		>
			{userData ? (
				<Paper elevation={3} style={{ padding: "2rem", width: "400px" }}>
					<Typography variant="h5" component="h1" gutterBottom>
						Dane użytkownika
					</Typography>

					<Formik
						initialValues={{
							name: userData.name || "",
							surname: userData.surname || "",
							phone: userData.phone || ""
						}}
						validate={validate}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting }) => (
							<Form>
								<StyledGrid container spacing={2}>
									<StyledGrid item xs={12}>
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
										<StyledErrorMessage name="name" component="div" />
									</StyledGrid>
									<StyledGrid item xs={12}>
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
										<StyledErrorMessage name="surname" component="div" />
									</StyledGrid>
									<StyledGrid item xs={12}>
										<Typography
											variant="subtitle1"
											gutterBottom
											fontWeight={"bolder"}
										>
											Telefon
										</Typography>
										<Field
											as={TextField}
											fullWidth
											name="phone"
											placeholder="Wpisz numer telefonu"
											autoComplete="phone"
										/>
										<StyledErrorMessage name="phone" component="div" />
									</StyledGrid>
									<StyledGrid item xs={12}>
										<Button
											type="submit"
											variant="contained"
											color="primary"
											fullWidth
											disabled={isSubmitting}
										>
											{isSubmitting ? "Zapisywanie..." : "Zapisz"}
										</Button>
									</StyledGrid>
								</StyledGrid>
							</Form>
						)}
					</Formik>
				</Paper>
			) : (
				<CircularProgress />
			)}
		</Box>
	);
}
