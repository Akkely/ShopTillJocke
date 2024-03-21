import { useEffect, useState } from "react";
import Cart from "./Cart";
import { getAll } from "../services/CartService";

function CartList() {
	const [carts, setCarts] = useState([]);

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

	if (carts.length === 0) {
		return <h3>Kunde inte hämta kundkorg</h3>;
	}

	return (
		<>
			<h2>Kundkorgar</h2>
			<ul>
			{carts.map((cartItem) => (
  <li key={cartItem.id}>
    <Cart text={cartItem.name} />
  </li>
))}
			</ul>
		</>
	);
}

export default CartList;
