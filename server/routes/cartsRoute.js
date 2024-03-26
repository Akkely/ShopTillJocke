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

// addProToCart


// router.post('/:id/addCartItem', (req, res) => {
//   const review = req.body;
//   const id = req.params.id;

//   postService.addReview(id, review).then((result) => {
//     res.status(result.status).json(result.data);
//   });
// });







// ************
// POST route för att lägga till en produkt i varukorgen
// router.post("/addProduct", async (req, res) => {
//   const {  productId, amount } = req.body;

//   try {
//     // Hitta en befintlig varukorg för användaren som inte har betalats, annars skapa en ny
// 		const cart = await db.cart.findOne({
// 			where: { cartId:id, payed: false },
// 			include: [{
// 				model: db.product, // Antag att detta är namnet på din produktmodell
// 				as: 'products', // Använd det alias du definierat för relationen, om nödvändigt
// 			}]
// 		});

//     if (!cart) {
//       cart = await db.cart.create({ payed: false });
//     }

//     // Lägg till produkten i varukorgen
//     const cartItem = await db.cartRow.create({
//       cartId: cart.id,
//       productId: productId,
//       amount: amount,
//     });

//     res.status(201).json({
//       message: "Produkten har lagts till i varukorgen",
//       cartItem: cartItem,
//     });
//   } catch (error) {
//     console.error("Fel vid tillägg av produkt till varukorgen:", error);
//     res.status(500).json({
//       message: "Internt serverfel vid tillägg av produkt till varukorgen",
//     });
//   }
// });

// **************

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
    let cart = await db.cart.findOne({ where: { payed: false } });
    if (!cart) {
      cart = await db.cart.create({ payed: false });
    }

    // Skapa en ny cartItem med produktinformationen
    const cartItem = await db.cartRow.create({
      cartId: cart.id,
      productId: product.id,
      amount: amount,
			include: [
				{
					model: db.product,
					as: 'product' // Använd samma alias som definierat i associationen
				}
			]
    });

    // Hämta den fullständiga cartItem-informationen inklusive produktinformation
		const fullCartItem = await db.cartRow.findOne({
			where: { id: cartItem.id },
			include: [
				{
					model: db.product,
					as: 'product' // Använd samma alias som definierat i associationen
				}
			]
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




// // Retrieve products by cart ID
// router.get("/:id", async (req, res) => {
// 	const id = req.params.id;
// 	try {
// 		const cartItems = await db.cartRow.findAll({
// 			where: { cartId: id },
// 	// include: [{
//   //   model: db.product, // Inkludera produkter som är relaterade till kundvagnsobjekten
//   //   as: 'product', // Se till att du har definierat en lämplig association i dina modeller
//   // }]
// 		});
// 		res.json(cartItems);
// 	} catch (error) {
// 		console.error("Error fetching cart items:", error);
// 		res.status(500).json({ message: "Internal server error" });
// 	}
// });



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

// router.post("/:userId/addToCart", async (req, res) => {
// 	const { userId } = req.params;
// 	// const { userId } = 1;
// 	const { productId } = req.body;
// 	console.log("Adding to cart", { userId, productId });

// 	try {
// 		let cart = await db.cart.findOne({
// 			where: { userId: userId, payed: false },
// 		});
// 		console.log("Found or creating cart", cart);

// 		if (!cart) {
// 			cart = await db.cart.create({ userId: userId, payed: false });
// 			console.log("Created new cart", cart);
// 		}

// 		const cartItem = await db.cart.create({
// 			cartId: cart.id,
// 			userId: 1,
// 			productId: productId,
// 			quantity: 1,
// 		});
// 		console.log("Added product to cart", cartItem);

// 		res.status(201).json(cartItem);
// 	} catch (error) {
// 		console.error("Failed to add product to cart:", error);
// 		res.status(500).json({ message: "Internal server error" });
// 	}
// });


// router.get("/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
// 		const cart = await db.cart.findOne({
// 			where: { userId: userId, payed: false },
// 			include: [{
// 				model: db.cartRow,
// 				as: 'cartItems',
// 				include: [{
// 					model: db.product
// 				}]
// 			}]
// 		});

//     if (!cart) {
//       return res.status(404).json({ message: "Ingen aktiv varukorg hittades för användaren." });
//     }

//     res.status(200).json(cart);
//   } catch (error) {
//     console.error("Error fetching cart:", error);
//     res.status(500).json({ message: "Internt serverfel vid hämtning av varukorgen." });
//   }
// });



router.get('/:id', (req, res) => {
  const id = req.params.id;

  postService.getByCart(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

// router.get("/", (req, res) => {
// 	db.cart.findAll().then((result) => {
// 		res.send(result);
// 	});
// });





// router.get('/:id', async (req, res) => {
// 	const id = req.params.id;
// 	const cart = req.params.cartId;

// 	try {

// 		postService.getCartWithProducts(id);

// 			// Formatera varje produkt i varukorgen
// 			const formattedCartItems = cart.products.map(product => _formatCart(product, cart));

// 			// Skicka tillbaka den formaterade listan av produkter
// 			res.json(formattedCartItems);
// 	} catch (error) {
// 			console.error('Error fetching cart:', error);
// 			res.status(500).json({ message: 'Internt serverfel vid hämtning av varukorgen.' });
// 	}
// });



// router.get("/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const cart = await db.cart.findOne({
//       where: { userId: userId, payed: false },
//       include: [{
//         model: db.cartRow,
//         as: 'cartItems',
//         include: [{
//           model: db.product, // Se till att associationen är korrekt konfigurerad
//           as: 'product' // Antag att du har definierat detta alias i dina modellrelationer
//         }]
//       }]
//     });

//     if (!cart) {
//       return res.status(404).json({ message: "Ingen aktiv varukorg hittades för användaren." });
//     }

//     res.status(200).json(cart);
//   } catch (error) {
//     console.error("Error fetching cart:", error);
//     res.status(500).json({ message: "Internt serverfel vid hämtning av varukorgen." });
//   }
// });

// router.get("/:userId", async (req, res) => {
// 	const { userId } = req.params;

// 	try {
// 			// Hitta den befintliga varukorgen för användaren som inte har betalats
// 			const cart = await db.cart.findOne({
// 					where: { userId: userId, payed: false },
// 					include: [{
// 						model: db.cartRow,
// 						as: 'cartItems',
// 						include: [{
// 							model: db.product
// 						}]
// 					}]
// 			});

// 			if (!cart) {
// 					return res.status(404).json({ message: "Ingen aktiv varukorg hittades för användaren." });
// 			}

// 			// Returnera varukorgens innehåll
// 			res.status(200).json(cart);
// 	} catch (error) {
// 			console.error("Error fetching cart:", error);
// 			res.status(500).json({ message: "Internt serverfel vid hämtning av varukorgen." });
// 	}
// });

router.get("/addProduct", (req, res) => {
	db.cart.findAll().then((result) => {
		res.send(result);
	});
});

router.get("/cartspro", (req, res) => {
   
			res.send(req.params)
});







module.exports = router;
