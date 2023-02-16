const express = require("express");
const router = express.Router();
const authorController = require("../controllers/controller.author");

// Create an author
router.post("/create", authorController.createAuthor);

// Get all authors
router.get("/", authorController.getAuthors);

// Get a single author
router.get("/:id", authorController.getAuthor);

// Update an author
router.put("/:id", authorController.updateAuthor);

// Delete an author
router.delete("/:id", authorController.deleteAuthor);

module.exports = router;
