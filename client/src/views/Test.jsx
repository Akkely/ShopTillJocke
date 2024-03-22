import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
function Test() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);

	const [cartItems, setCartItems] = useState([]);

	const showCart = () => {
		// Hämta produktinformation
		const { id, name, price } = product;

		// Skapa nytt kundvagnsobjekt
		const cartItem = { id, name, price, quantity: 1 };

		// Uppdatera kundvagnens state
		setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
		// setCartItems([...cartItems, cartItem]);
		alert("Produkt tillagd i varukorgen!");
	};

	return (
		<>
			<Button
				variant='contained'
				color='primary'
				onClick={showCart}
				aria-label='Lägg till i kundvagn'
			>
				Lägg till i kundvagn
			</Button>

			{/* <Test cartItems={cartItems} /> */}
		</>
	);
}

export default Test;
