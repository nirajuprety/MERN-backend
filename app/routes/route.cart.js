const express = require("express");
const router = express.Router();
const cartController = require("../controllers/controller.cart");

// add to cart
router.post("/addToCart", cartController.addToCart);

// Get all cart items
router.get("/", cartController.getCart);

// Delete an item from the cart
router.delete("/:id", cartController.removeFromCart);

module.exports = router;
