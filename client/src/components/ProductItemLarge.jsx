import PropTypes from "prop-types";

import {} from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button } from "@mui/material";
import { addToCart } from "../services/CartService";
import { useState, useEffect } from "react";




function ProductItemLarge({ product }) {
	const [amount, setAmount] = useState(1); // Antag att du vill lägga till 1 produkt som standard
	// Ersätt 'hardcodedCartId' med faktisk logik för att hämta den aktuella användarens varukorgs-ID
	const hardcodedCartId = 1; // Exempel på hårdkodat varukorgs-ID

	const handleAddToCart = async () => {
			try {
					// Anropa addToCart med den hårdkodade varukorgs-ID, produkt-ID och önskat antal
					const cartItem = await addToCart(hardcodedCartId, product.id, amount);
					alert("Produkt tillagd i varukorgen!");
			} catch (error) {
					console.error("Could not add product to cart", error);
					alert("Misslyckades med att lägga till produkt i varukorgen.");
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
