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
				setCartItems([fetchedCartItems]); // Om svaret är ett enda objekt, omslut det i en array
			} catch (error) {
				console.error("Failed to fetch cart items:", error);
			}
		};
		fetchAndSetCartItems();
	}, []);

	return  (
		<div>
			<h2>Din kundvagn</h2>

			{cartItems.map((item, index) => (
				<div key={index}>
					Namn: {item.product?.title || "Produktnamn saknas"}, Pris:{" "}
					{item.product?.price || 0} kr, Antal: {item.amount || 1}, Totalt:{" "}
					{(item.amount || 1) * (item.product?.price || 0)} kr
				</div>
			))}
		</div>

	);
}

export default CartView;
