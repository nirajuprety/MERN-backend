const Cart = require('../models/model.cart');
const User = require('../models/model.user');
const Book = require('../models/model.book');

// Add a book to the cart
exports.addToCart = async (req, res) => {
  const { bookId, quantity } = req.body;

  try {
    // Find the user and book
    const user = await User.findById(req.user._id);
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).send({ error: 'Book not found' });
    }

    // Find an existing cart item or create a new one
    let cartItem = await Cart.findOne({ user: user, book: bookId });

    if (cartItem) {
      // Update the quantity if the cart item already exists
      cartItem.quantity += quantity;
    } else {
      // Create a new cart item if it doesn't already exist
      cartItem = new Cart({ user: user, book: book, quantity: quantity });
    }

    await cartItem.save();

    // Populate the book attribute to return the full book object
    await cartItem.populate('book').execPopulate();

    return res.send(cartItem);
  } catch (error) {
    return res.status(500).send({ error: 'Error adding book to cart' });
  }
};

// Get all books in the cart
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // Find all cart items for the user and populate the book attribute
    const cartItems = await Cart.find({ user: user }).populate('book');

    return res.send(cartItems);
  } catch (error) {
    return res.status(500).send({ error: 'Error getting cart' });
  }
};

// Remove a book from the cart
exports.removeFromCart = async (req, res) => {
  const { bookId } = req.body;

  try {
    const user = await User.findById(req.user._id);

    // Remove the cart item with the specified book and user references
    const cartItem = await Cart.findOneAndRemove({ user: user, book: bookId });

    if (!cartItem) {
      return res.status(404).send({ error: 'Cart item not found' });
    }

    return res.send(cartItem);
  } catch (error) {
    return res.status(500).send({ error: 'Error removing book from cart' });
  }
};
