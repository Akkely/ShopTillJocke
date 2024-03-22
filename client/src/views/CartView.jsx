import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { Button } from "@mui/material";
import { getCartById } from "../services/CartService";
import CartList from "../components/CartList";
import Cart from "../components/Cart";
import { useNavigate, useParams } from "react-router-dom";

function CartView() {



	return (
		<div>
			<h2>Din kundvagn</h2>
            <p>hejsan</p>
	<CartList/>
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


// function CartView() {
//     return (

//  <h2>hej</h2>

//     )
// }

// export default CartView;
