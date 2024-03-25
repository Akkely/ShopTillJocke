import { useState } from 'react';
import ProductItemLarge from '../components/ProductItemLarge';
import CartView from './CartView';


function Test() {


	// Logik för att hantera produktval och uppdatering av cartItems
  const [cartItems, setCartItems] = useState([]);
  
  return (
    <div>
      {/* Några andra komponenter som hanterar produktval */}
      <ProductItemLarge cartItems={cartItems} setCartItems={setCartItems} />
      <CartView cartItems={cartItems} setCartItems={setCartItems} /> 
    </div>
  );
}

export default Test;
