const CategoryController = require('../controllers/controller.category');

const router = require('express').Router();


// Create an author
router.post("/create", CategoryController.store);

// Get all authors
router.get("/", CategoryController.list);

// Delete an author
router.delete("/:id", CategoryController.delete);

module.exports = router;