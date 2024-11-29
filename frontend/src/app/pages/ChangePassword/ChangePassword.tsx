import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { PaperStyled } from "../Login/Login";
import { Link, useNavigate } from "react-router-dom";
import useService from "../useService";
import { useAlert } from "../../systems/useAlert";
import { StyledErrorMessage, StyledGrid } from "../Register/Register";

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
	const Service = useService();
	const alert = useAlert();
	const navigate = useNavigate();

	const handleSubmit = (
		values: FormValues,
		{ setSubmitting, setErrors }: any
	) => {
		const data = {
			email: values.email
		};
		Service.passwordReset(data)
			.then(() => {
				alert.showAlert("Przypomnienie hasła zostało wysłane", "success");
			})
			.catch(() => {
				alert.showAlert("Wystąpił problem", "success");
			})
			.finally(() => {
				setSubmitting(false);
				navigate("/");
			});
	};
	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			justifyContent={"center"}
			alignItems={"center"}
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
				<Typography
					variant="h4"
					gutterBottom
					textAlign="center"
					fontWeight={"bold"}
					padding={"2rem"}
				>
					Zapomniałeś hasła?
				</Typography>
				<Formik
					initialValues={initialValues}
					validate={validate}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form>
							<StyledGrid container spacing={3}>
								<StyledGrid item xs={12}>
									<Typography
										variant="subtitle1"
										gutterBottom
										fontWeight={"bolder"}
									>
										E-mail
									</Typography>
									<Field
										as={TextField}
										fullWidth
										type="email"
										name="email"
										placeholder="qaz123@gmail.com"
										autoComplete="email"
									/>
									<StyledErrorMessage name="email" component="div" />
								</StyledGrid>

								<StyledGrid item xs={12}>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										fullWidth
										disabled={isSubmitting}
									>
										{isSubmitting
											? "Wysyłanie przypomnienia..."
											: "Przypomnij hasło"}
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
						color: theme.palette.info.light
					}}
				>
					Znasz hasło?&nbsp;&nbsp;&nbsp;
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
