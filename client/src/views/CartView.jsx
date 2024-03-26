// import React, { useEffect, useState } from "react";
// import { fetchCart } from "../services/CartService";

// function CartView({}) {
// 	const [cartItems, setCartItems] = useState([]);

// 	useEffect(() => {
// 		const fetchAndSetCartItems = async () => {
// 			try {
// 				const userId = 1; // Exempelanvändar-ID, anpassa efter dina behov
// 				const fetchedCartItems = await fetchCart(userId);
// 				console.log("Fetched Cart Items:", fetchedCartItems); // Logga för att inspektera strukturen
// 				setCartItems([fetchedCartItems]); // Om svaret är ett enda objekt, omslut det i en array
// 			} catch (error) {
// 				console.error("Failed to fetch cart items:", error);
// 			}
// 		};
// 		fetchAndSetCartItems();
// 	}, []);

// 	return (
// 		<div>
// 			<h2>Din kundvagn</h2>

// 			{cartItems.map((item, index) => (
// 				<div key={index}>
// 					Namn: {item.product?.title || "Produktnamn saknas"}, Pris:{" "}
// 					{item.product?.price || 0} kr, Antal: {item.amount || 1}, Totalt:{" "}
// 					{(item.amount || 1) * (item.product?.price || 0)} kr
// 				</div>
// 			))}
// 		</div>
// 	);
// }

// export default CartView;

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

		const calculateTotal = (cartItems) => {
			return cartItems.reduce((total, item) => {
					const price = Number(item.price) || 0; // Konverterar till nummer och ger standardvärde 0
					const amount = Number(item.amount) || 1; // Konverterar till nummer och ger standardvärde 1
					return total + (price * amount);
			}, 0);
	};
	

    return (
			<>
        <div>
            <h2>Din kundvagn</h2>
            {cartItems.length > 0 ? (
                cartItems.map((product, index) => (
                    <div key={index}>
                        Namn: {product.title || "Produktnamn saknas"}, Pris: {product.price || 0} kr, Antal: {product.amount || 1}, Totalt: {(product.amount || 1) * (product.price || 0)} kr
                     </div>
										
                )   )
           ) : (
                <p>Kundvagnen är tom</p>
            )}
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