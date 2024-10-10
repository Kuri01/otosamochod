import { CircularProgress } from "@mui/material";

export default function Fallback() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
				width: "100%"
			}}
		>
			<CircularProgress size="3rem" />
		</div>
	);
}
