import axios from "./api";

export async function getAll() {
	try {
		const response = await axios.get("/carts");

		if (response.status === 200) return response.data;
		else {
			console.log(response);
			return [];
		}
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}
export async function create(cart) {
  try {
    const response = await axios.post('/carts', cart);
    if (response.status === 200) return response.data;
    else {
      console.log(response.data);
      return null;
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
  }
}

// ************TESTTTT


// Function to fetch a specific cart by ID
export async function getCartById(cartId) {
  try {
    const response = await axios.get(`/carts/${cartId}`);
    if (response.status === 200) {
      return response.data; // Assuming the backend returns the cart data directly
    } else {
      console.log(response);
      return null; // Or handle this case as needed
    }
  } catch (error) {
    console.error("Failed to fetch cart", error);
    throw error; // Or return null, depending on how you want to handle errors
  }
}


// Add this function to your CartService
export async function addToCart(userId, productId) {
  try {
    // Include the userId in the URL path
    const response = await axios.post(`/carts/${userId}/addToCart`, { productId });
    return response.data;
  } catch (error) {
    console.error("Failed to add product to cart", error);
    throw error;
  }
}