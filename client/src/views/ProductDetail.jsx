import ProductItemLarge from "../components/ProductItemLarge";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import Review from "../components/Review";
import { useState, useEffect } from "react";
import { getOne, addReview } from "../services/ProductService";
import CartView from "./CartView";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		getOne(id).then((product) => setProduct(product));
	}, [id]);

	const navigate = useNavigate();


  
  const handleAddToCart = () => {
    // Hämta produktinformation
    const { id, name, price } = product;
  
    // Skapa nytt kundvagnsobjekt
    const cartItem = { id, name, price, quantity: 1 };

    // Uppdatera kundvagnens state
    setCartItems((prevCartItems) => [...prevCartItems, cartItem]); 
    // setCartItems([...cartItems, cartItem]);
    alert("Produkt tillagd i varukorgen!");
  };


	// const handleAddToCart = () => {
	// 	// Hämta produktinformation
	// 	const { id, name, price } = product;

	// 	// Skapa nytt kundvagnsobjekt
	// 	const cartItem = { id, name, price, quantity: 1 };

	// 	// Uppdatera kundvagnens state
	// 	setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
	// 	// setCartItems([...cartItems, cartItem]);
	// 	alert("Produkt tillagd i varukorgen!");
	// };

	function onReviewAdd(review) {
		addReview(product.id, review)
			.then(() => getOne(id))
			.then((product) => setProduct(product));
	}

	return product ? (
		<div>
			<ProductItemLarge product={product} />
			<Button onClick={() => navigate(-1)}>Tillbaka</Button>
			<Button onClick={() => navigate(`/products/${product.id}/edit`)}>
				{" "}
				Ändra vara
			</Button>

			<ReviewForm onSave={onReviewAdd} />
			<h2>Andras recensioner</h2>
			{product.reviews &&
				product.reviews.map((review, i) => (
					<Review key={`review_${i}`} review={review} />
				))}

			<Button
				variant='contained'
				color='primary'
				startIcon={<ShoppingCartIcon />}
				onClick={handleAddToCart}
				aria-label='Lägg till i kundvagn'
			>
				Lägg till i kundvagn
			</Button>
			{/* <CartView cartItems={cartItems} />  */}
		</div>
	) : (
		<h3>Kunde inte hämta produkten</h3>
	);
}

export default ProductDetail;

// import ProductItemLarge from '../components/ProductItemLarge';
// import { Button } from '@mui/material';
// import { useNavigate, useParams } from 'react-router-dom';
// import ReviewForm from '../components/ReviewForm';
// import Review from '../components/Review';
// import {useState, useEffect} from 'react';
// import { getOne,addReview } from '../services/ProductService';

// function ProductDetail() {
// const { id } = useParams();
// const [product, setProduct] = useState(null);

// useEffect(() => {
//   getOne(id).then((product) => setProduct(product));
// }, [id]);

//   const navigate = useNavigate();

//   function onReviewAdd(review) {
//     addReview(product.id, review)
//     .then(()=>getOne(id))
//     .then((product) => setProduct(product));
//    }

//   return product ? (
//     <div>
//       <ProductItemLarge product={product} />
//       <Button onClick={() => navigate(-1)}>Tillbaka</Button>
//       <Button onClick={() => navigate(`/products/${product.id}/edit`)}> Ändra vara</Button>

//       <ReviewForm onSave = {onReviewAdd}  />
//       <h2>Andras recensioner</h2>
//       {product.reviews &&
//         product.reviews.map((review, i) => (
//           <Review key={`review_${i}`} review={review} />
//         ))}

//     </div>
//   ):(
//     <h3>Kunde inte hämta produkten</h3>
//   );
// }

// export default ProductDetail;
