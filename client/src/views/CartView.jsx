import React, { useEffect, useState } from "react";
import { fetchCart, getAll } from "../services/CartService"; // Importera din fetchCart funktion

function CartView({}) {
	const [cartItems, setCartItems] = useState([]);

	const total = calculateTotal(cartItems);

	console.log(cartItems);

	// useEffect(() => {
	// 	const fetchAndSetCartItems = async () => {
	// 		try {
	// 			const userId = 1; // Anpassa till din logik för att få användar-ID
  //       const fetchedCartItems = await fetchCart(userId);
  //       console.log("Fetched Cart Items:", fetchedCartItems); 
        
  //       setCartItems(fetchedCartItems); 
	// 		} catch (error) {
	// 			console.error("Failed to fetch cart items:", error);
	// 		}
	// 	};
	// 	fetchAndSetCartItems();
	// }, []);

	// const fetchAndSetCartItems = async () => {
	//   try {
	//       const userId = 1; // Anpassa till din logik för att få användar-ID
	//       const response = await fetchCart(userId);
	//       console.log("Response from fetchCart:", response); // Lägg till denna loggning
	//       const cartItemsWithProductInfo = response.cartItems.map(item => ({
	//           ...item,
	//           name: item.product?.name,
	//           price: item.product?.price,
	//       }));
	//       setCartItems(cartItemsWithProductInfo);
	//   } catch (error) {
	//       console.error("Failed to fetch cart items:", error);
	//   }
	// };
  

  useEffect(() => {
    const fetchAndSetCartItems = async () => {
      try {
        const userId = 1; // Exempelanvändar-ID, anpassa efter dina behov
        const fetchedCartItems = await fetchCart(userId);
        console.log('Fetched Cart Items:', fetchedCartItems); // Logga för att inspektera strukturen
        setCartItems(fetchedCartItems.cartItems || []); // Antag att din data kommer tillbaka med en 'cartItems'-nyckel
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };
    fetchAndSetCartItems();
  }, []);

	return (
		<div>
			<h2>Din kundvagn</h2>

      {cartItems.map((item, index) => (
  <div key={index}>
   
    Namn: {item.product?.name || 'Produktnamn saknas'}, 
    Pris: {item.product?.price || 0} kr, 
    Antal: {item.amount}, 
    Totalt: {item.amount * (item.product?.price || 0)} kr
  </div>
))}

			{/* {cartItems.length === 0 ? (
				<p>Kundvagnen är tom</p>
			) : (
				<ul>
					{cartItems.map((item, index) => (
						<li key={index}>
							namn{item.product.name} - pris{item.price} kr x antal{" "}
							{item.quantity} = {item.price * item.quantity} kr
						</li>
					))}
				</ul>
			)}
			<p>Totalt: {total} kr</p>

 */}



		</div>




	);
}




function calculateTotal(cartItems) {
	return cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
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
