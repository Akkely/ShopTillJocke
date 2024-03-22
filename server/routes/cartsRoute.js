const router = require("express").Router();
const db = require("../models");
const postService = require("../services/postService");

// **** Vi har ändrat till id/product istället för cart/addProduct
// router.get("/:id/products", (req, res) => {
// 	const id = req.params.id;

// 	postService.getByCart(id).then((result) => {
// 		res.status(result.status).json(result.data);
// 	});
// });

// POST route för att lägga till en produkt i varukorgen
router.post("/addProduct", async (req, res) => {
  const { userId, productId, amount } = req.body;

  try {
    // Hitta en befintlig varukorg för användaren som inte har betalats, annars skapa en ny
    let cart = await db.cart.findOne({
      where: { userId: userId, payed: false },
    });

    if (!cart) {
      cart = await db.cart.create({ userId: userId, payed: false });
    }

    // Lägg till produkten i varukorgen
    const cartItem = await db.cartRow.create({
      cartId: cart.id,
      productId: productId,
      amount: amount,
    });

    res.status(201).json({
      message: "Produkten har lagts till i varukorgen",
      cartItem: cartItem,
    });
  } catch (error) {
    console.error("Fel vid tillägg av produkt till varukorgen:", error);
    res.status(500).json({
      message: "Internt serverfel vid tillägg av produkt till varukorgen",
    });
  }
});








// Retrieve products by cart ID
router.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const cartItems = await db.cartRow.findAll({
			where: { cartId: id },
			include: [
				{
					model: db.product,
					as: "product",
				},
			],
		});
		res.json(cartItems);
	} catch (error) {
		console.error("Error fetching cart items:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.get("/", (req, res) => {
	db.cart.findAll().then((result) => {
		res.send(result);
	});
});

router.post("/", (req, res) => {
	const cart = req.body;
	db.cart.create(cart).then((result) => {
		res.send(result);
	});
});

router.delete("/", (req, res) => {
	db.cart
		.destroy({
			where: { id: req.body.id },
		})
		.then(() => {
			res.json(`Produkten togs bort`);
		});
});

router.post("/:userId/addToCart", async (req, res) => {
	const { userId } = req.params;
	// const { userId } = 1;
	const { productId } = req.body;
	console.log("Adding to cart", { userId, productId });

	try {
		let cart = await db.cart.findOne({
			where: { userId: userId, payed: false },
		});
		console.log("Found or creating cart", cart);

		if (!cart) {
			cart = await db.cart.create({ userId: userId, payed: false });
			console.log("Created new cart", cart);
		}

		const cartItem = await db.cart.create({
			cartId: cart.id,
			userId: 1,
			productId: productId,
			quantity: 1,
		});
		console.log("Added product to cart", cartItem);

		res.status(201).json(cartItem);
	} catch (error) {
		console.error("Failed to add product to cart:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});



router.get("/addProduct", (req, res) => {
	db.cart.findAll().then((result) => {
		res.send(result);
	});
});

router.get("/cartspro", (req, res) => {
   
			res.send(req.params)
});
module.exports = router;
