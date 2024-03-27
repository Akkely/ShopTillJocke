
import PropTypes from "prop-types";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
	Button,
	TextField,
	Box,
	CardMedia,
	Paper,
	Typography,
} from "@mui/material";
import { addToCart } from "../services/CartService";
import { useState } from "react";

function ProductItemLarge({ product }) {
	const [amount, setAmount] = useState(1); // Startar med 1 produkt som standard
	const hardcodedCartId = 1; // Exempel på hårdkodat varukorgs-ID
	const userId = 1; // Exempel på hårdkodat användar-ID

	const handleAddToCart = async () => {
		try {
			const cartItem = await addToCart(
				hardcodedCartId,
				product.id,
				amount,
				userId
			);
			alert("Produkt tillagd i varukorgen!");
		} catch (error) {
			console.error("Could not add product to cart", error);
			alert("Misslyckades med att lägga till produkt i varukorgen.");
		}
	};

	return (
		<Paper sx={{ my: 4, p: 4, borderRadius: 2 }} elevation={3}>
			<Box sx={{ mb: 2 }}>
				<Typography variant='h2'> {product.title} </Typography>
				<Typography variant='body1'> {product.body} </Typography>
				<Typography variant='p'> {product.price} kr</Typography>
			</Box>

			<Box>
				<TextField
					label='Antal'
					type='number'
					InputLabelProps={{
						shrink: true,
					}}
					variant='outlined'
					value={amount}
					onChange={(e) => setAmount(Number(e.target.value))}
					size='small'
					sx={{ mb: 1, width: 1 / 6 }}
				/>

				<Button
					sx={{ ml: 1.5 }}
					onClick={handleAddToCart}
					startIcon={<AddShoppingCartIcon />}
					color='primary'
				>
					Lägg till i varukorgen
				</Button>
			</Box>

			<CardMedia
				sx={{ borderRadius: 2 }}
				component='img'
				image={product.imageUrl}
			/>
		</Paper>
	);
}

ProductItemLarge.propTypes = {
	product: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		imageUrl: PropTypes.string,
		createdAt: PropTypes.string,
		updatedAt: PropTypes.string,
		body: PropTypes.string,
		price: PropTypes.number,
		carts: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
};

export default ProductItemLarge;

