import PropTypes from "prop-types";

import {} from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button } from "@mui/material";
import { addToCart } from "../services/CartService";
import { useState, useEffect } from "react";
function ProductItemLarge({ product }) {


	const [cart, setCart] = useState([]);
	// const { addToCart } = require("../services/CartService");
	const handleAddToCart = async () => {
		try {
			// Directly use the hardcoded user ID
			const cartId = "1"; // Assuming "1" is the ID of your single user
			await addToCart(cartId, product.id);
			alert("Product added to cart!");
		} catch (error) {
			console.error("Could not add product to cart", error);
			alert("Failed to add product to cart.");
		}
	};

	return (
		<>
			<h3>{product.title}</h3>
			<p>{product.body}</p>
			<p>{product.price} kr</p>

			<Button
				onClick={handleAddToCart} // Add the onClick handler here
				startIcon={<AddShoppingCartIcon />}
				color='primary'
				aria-label='add to shopping cart'
			>
				{" "}
				Add to Cart
			</Button>
				{/* <button onClick={() => handleAddToCart(product.id)}>
		Add to Cart
	</button>; */}
		</>
	);


}
// Vi har lagt till emptyProduct i propTypes  för att släcka id i ProductEdit.
ProductItemLarge.propTypes = {
	product: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		imageUrl: PropTypes.string,
		createdAt: PropTypes.string,
		updatedAt: PropTypes.string,
		//review: PropTypes.number,
		/* emptyProduct: PropTypes.string, */
		body: PropTypes.string,
		price: PropTypes.number,
		carts: PropTypes.arrayOf(PropTypes.string), // Antagande om vad carts innehåller
	}).isRequired,
};

export default ProductItemLarge;
