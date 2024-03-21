import React, { useEffect, useState } from 'react';
import { getAll } from '../services/CartService'; // Assuming getAll fetches all carts with their contents

function CartDetail() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    getAll().then(setCarts).catch(error => {
      console.error("Failed to fetch carts:", error);
    });
  }, []);

  if (!carts) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  return (
    <div>
      <h2>All Carts</h2>
      {carts.map((cart) => (
        <div key={cart.id}>
          <h3>Cart ID: {cart.id}</h3>
          <ul>
          {cart.items?.map((item) => ( // Use optional chaining to safely access items
          <li key={item.id}>
            {item.productName} - Quantity: {item.quantity}
          </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CartDetail;
