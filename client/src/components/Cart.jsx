import { Chip } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getCartById } from "../services/CartService"; // Assuming getAll fetches all carts with their contents

function Cart() {
	const { id } = useParams();
	console.log("hejsan", id);

	const userId = "1"; // Assuming "1" is the ID of your single user

	useEffect(() => {
		getCartById(id)
			.then((data) => {
				console.log(data); // Log the fetched data to see its structure
				setCart(data);
			})
			.catch((error) => {
				console.error("Failed to fetch cart details:", error);
			});
	}, [id]);

	return (
		<Link to={`/carts/${userId}`}>
			<Chip label={userId}></Chip>
		</Link>
	);
}
Cart.propTypes = {
	text: PropTypes.string.isRequired,
	// text: PropTypes.shape({
	// 	id: PropTypes.number,
	// 	title: PropTypes.string,
	// 	imageUrl: PropTypes.string,
	// 	createdAt: PropTypes.string,
	// 	updatedAt: PropTypes.string,

	// 	body: PropTypes.string,
	// 	price: PropTypes.number,
	// 	carts: PropTypes.arrayOf(PropTypes.string) // Antagande om vad carts innehåller
	// }).isRequired
};

export default Cart;
