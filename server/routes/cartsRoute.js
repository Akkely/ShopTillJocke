const router = require("express").Router();
const db = require("../models");
const postService = require("../services/postService");


// POST route för att lägga till en produkt i varukorgen
router.post("/addProduct", async (req, res) => {
	const { productId, amount } = req.body;

	try {
		// Hämta produktinformationen baserat på productId
		const product = await db.product.findByPk(productId);
		if (!product) {
			return res.status(404).json({ message: "Produkten hittades inte" });
		}

		// Hitta en befintlig varukorg eller skapa en ny
		let cart = await db.cart.findOne({ where: { userId:1 } });
		if (!cart) {
			cart = await db.cart.create({ userId:1 });
		}

		// Skapa en ny cartItem med produktinformationen
		const cartItem = await db.cartRow.create({
			cartId: cart.id,
			productId: product.id,
			amount: amount,
			include: [
				{
					model: db.product,
					as: "product", // Använd samma alias som definierat i associationen
				},
			],
		});

		// Hämta den fullständiga cartItem-informationen inklusive produktinformation
		const fullCartItem = await db.cartRow.findOne({
			where: { id: cartItem.id },
			include: [
				{
					model: db.product,
					as: "product", // Använd samma alias som definierat i associationen
				},
			],
		});

		res.status(201).json({
			message: "Produkten har lagts till i varukorgen",
			cartItem: fullCartItem, // Inkluderar produktinformation
		});
	} catch (error) {
		console.error("Fel vid tillägg av produkt till varukorgen:", error);
		res.status(500).json({
			message: "Internt serverfel vid tillägg av produkt till varukorgen",
		});
	}
});

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

router.get("/addProduct", (req, res) => {
	db.cart.findAll().then((result) => {
		res.send(result);
	});
});



module.exports = router;
