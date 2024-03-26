import React, { useEffect, useState } from "react";
import { fetchCart } from "../services/CartService";

function CartView({}) {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		const fetchAndSetCartItems = async () => {
			try {
				const userId = 1; // Exempelanvändar-ID, anpassa efter dina behov
				const fetchedCartItems = await fetchCart(userId);
				console.log("Fetched Cart Items:", fetchedCartItems); // Logga för att inspektera strukturen
				if (fetchedCartItems.length > 0) {
					setCartItems(fetchedCartItems[0].products || []); // Antag att första objektet innehåller en 'products'-nyckel
				}
			} catch (error) {
				console.error("Failed to fetch cart items:", error);
			}
		};
		fetchAndSetCartItems();
	}, []);

	function calculateTotal(cartItems) {
		return cartItems.reduce(
			(total, item) => total + (item.cartRow?.amount || 1) * (item.price || 0),
			0
		);
	}

	return (
		<>
			<div>
				<h2>Din kundvagn</h2>

				{cartItems.map((item, index) => (
					<div key={index}>
						Namn: {item.title || "Produktnamn saknas"}, Pris: {item.price || 0}{" "}
						kr, Antal: {item.cartRow?.amount || 1}, Totalt:{" "}
						{(item.cartRow?.amount || 1) * (item.price || 0)} kr
					</div>
				))}
			</div>
			<p>Totalt: {calculateTotal(cartItems)} kr</p>
		</>
	);
}

export default CartView;

//  function calculateTotal(cartItems) {
//    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//  }
//
