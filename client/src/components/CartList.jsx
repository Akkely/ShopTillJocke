import { useEffect, useState } from "react";
import { getAll,fetchCart } from "../services/CartService";

function CartList() {
	const [carts, setCarts] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		getAll().then((data) => {
			if (data && Array.isArray(data)) {
				setCarts(data);
			} else {
				console.error("Failed to fetch carts:", data);
				setCarts([]);
			}
		});
	}, []);


	useEffect(() => {
    const userId = 1; // Exempel på användar-ID
    fetchCart(userId)
      .then(cart => {
        setCartItems(cart.cartItems || []); // Antag att 'cartItems' är din datastruktur
      });
  }, []);


	if (carts.length === 0) {
		return <h3>Kunde inte hämta kundkorg</h3>;
	}

	return (
		<>
			<h2>Kundkorgar</h2>
			<ul>
				{cartItems.map((item, index) => (
					<li key={index}>
						Produkt: {item.product.name}, Antal: {item.amount}
					</li>
				))}
			</ul>
		</>
	);
}

export default CartList;
