const express = require("express");
const router = express.Router();
const bookController = require("../controllers/controller.book");

// Create an book
router.post("/create", bookController.createBook);

// Get all Books
router.get("/", bookController.getBooks);

// Get a single Book
router.get("/:id", bookController.getBook);

// Update an Book
router.put("/:id", bookController.updateBook);

// Delete an Book
router.delete("/:id", bookController.deleteBook);

module.exports = router;
