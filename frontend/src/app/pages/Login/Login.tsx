import { Button, Input } from "@mui/material";
import { ErrorMessage, Formik } from "formik";

export default function Login() {
	return (
		<div>
			<h1>Hello world! Login</h1>

			<Formik initialValues={{ email: "", password: "" }} onSubmit={() => {}}>
				{({ values, handleChange, handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<Input type="email" name="email" value={values.email} onChange={handleChange} />
						<ErrorMessage name="email" component="div" />

						<Input type="password" name="password" value={values.password} onChange={handleChange} />
						<ErrorMessage name="password" component="div" />

						<Button type="submit">Zaloguj</Button>
					</form>
				)}
			</Formik>
		</div>
	);
}
