import PropTypes from "prop-types";

import {} from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button } from "@mui/material";
import { addToCart } from "../services/CartService";
import { useState, useEffect } from "react";





	function ProductItemLarge({ product, cartItems, setCartItems }) {
		const handleAddToCart = (product) => {
			const updatedCartItems = [...cartItems, product];
			setCartItems(updatedCartItems);
			alert("Produkt tillagd i varukorgen!");
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
