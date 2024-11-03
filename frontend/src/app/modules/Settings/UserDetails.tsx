import { useEffect, useState } from "react";
import useService from "./useService";

export default function UserDetails() {

	//state any
	const [useData, setUserData] =  useState<any>(null)

	const Service = useService();

	useEffect(() => {
		Service.getUserDetails({id: 2}).then((response) => {
			console.log(response);
			setUserData(response);	
		}
		);
	}, []);

	return (
		<div>
			<h1>User Details</h1>
		</div>
	);
}
