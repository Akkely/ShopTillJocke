import { useState } from "react";
// import PropTypes from "prop-types";
import { Button } from "@mui/material";

function CartView({ cartItems, onRemoveItem }) {
	const [showCheckout] = useState([]);

	function handleCheckout() {
		// Implementera din checkout-funktionalitet här
		// ...
		alert("Beställning skickad!");
	}

	function handleRemoveItem(item) {
		onRemoveItem(item);
	}

	//   function handleUpdateQuantity(item, quantity) {
	//     onUpdateQuantity(item, quantity);
	//   }

	return (
		<div>
			<h2>Din kundvagn</h2>
			<ul>
				{cartItems.map((item, index) => (
					<li key={`cart-item-${index}`}>
						<p>
							{item.name} - {item.price} kr x
							<input
								type='number'
								min='1'
								value={item.quantity}
								// onChange={(e) => handleUpdateQuantity(item, parseInt(e.target.value))}
							/>
							<button onClick={() => handleRemoveItem(item)}>Ta bort</button>
						</p>
					</li>
				))}
			</ul>
			{cartItems.length > 0 && (
				<div>
					<p>Totalt: {calculateTotal(cartItems)} kr</p>

					{showCheckout && (
						<div>
							{/* Visa formulär eller annan checkout-funktionalitet här */}
							<p>Här kan du slutföra din beställning.</p>
							<Button variant='contained' onClick={handleCheckout}>
								Bekräfta beställning
							</Button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

// CartView.propTypes = {
// 	cartItems: PropTypes.array,
// 	onRemoveItem: PropTypes.func.isRequired,
// 	onUpdateQuantity: PropTypes.func.isRequired,
// };

export default CartView;

// Hjälpfunktioner

function calculateTotal(cartItems) {
	return cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
}

// function CartView() {
//     return (

//  <h2>hej</h2>

//     )
// }

// export default CartView;
