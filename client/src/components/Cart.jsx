import { Chip } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getCartById,fetchCart  } from "../services/CartService"; // Assuming getAll fetches all carts with their contents

function Cart() {


	return (

		<>
		<div>
			<h2>Din Varukorg</h2>

		</div>

		
		</>
	);
}
Cart.propTypes = {
	text: PropTypes.string,
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


// 	<Chip label={'hej'}></Chip>