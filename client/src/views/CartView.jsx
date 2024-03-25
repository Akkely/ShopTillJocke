import React, { useEffect, useState } from "react";
import { fetchCart, getAll } from "../services/CartService"; // Importera din fetchCart funktion


function CartView({ }) {

    const [cartItems, setCartItems] = useState([]);

	const total = calculateTotal(cartItems);
    useEffect(() => {
        const fetchAndSetCartItems = async () => {
          try {
            const userId = 1; 
            const fetchedCartItems = await fetchCart(userId);
            setCartItems(fetchedCartItems); 
          } catch (error) {
            console.error("Failed to fetch cart items:", error);
            // Hantera laddningsfel (visa en laddningsindikator eller lämpligt meddelande)
          } 
        };
        fetchAndSetCartItems();
      }, []); // Kör endast vid komponentladdning



	return (
        <div>
        <h2>Din kundvagn</h2>
        {cartItems.length === 0 ? (
          <p>Kundvagnen är tom</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                namn{item.name} - pris{item.price} kr x antal {item.quantity} = {item.price * item.quantity} kr
              </li>
            ))}
          </ul>
        )}
        <p>Totalt: {total} kr</p>
      </div>
    );
  }
  function calculateTotal(cartItems) {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
export default CartView;

// Hjälpfunktioner

// function CartView() {
//     return (

//  <h2>hej</h2>

//     )
// }

// export default CartView;
