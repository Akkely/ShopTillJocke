import React, { useEffect, useState } from 'react';
import { fetchCart,getAll } from '../services/CartService'; // Importera din fetchCart funktion

function CartView() {
    const [cartItems, setCartItems] = useState([]);
    const userId = 1; // Exempel på användar-ID, byt ut mot faktiskt värde
  
    useEffect(() => {
      fetchCart(userId)
        .then(cart => {
          console.log("Fetched cart:", cart);
          setCartItems(cart || []); // Antag att cart direkt innehåller lista med varukorgsobjekt
        })
        .catch(error => console.error("Failed to fetch cart:", error));
    }, []);
  
    return (
      <div>
        <h2>Din Varukorg</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index}>
              {/* Visa ID och antal direkt från objektet */}


              Produkt ID: {item.id},  Test:  testslut, Antal: {item.amount || 'Okänt'}
            </div>
          ))
        ) : (
          <p>Din varukorg är tom.</p>
        )}
      </div>
    );
  }

export default CartView;

// Hjälpfunktioner


// function CartView() {
//     return (

//  <h2>hej</h2>

//     )
// }

// export default CartView;
