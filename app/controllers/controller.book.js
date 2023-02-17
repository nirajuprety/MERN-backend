const Book = require("../models/model.book");

const storeImage = require("../helpers/fileUploadHelper");

exports.createBook = async (req, res) => {
  try {
    console.log(req.files);

    const { name, price, category, author, stock } = req.body;
    const image = req.files.image
    
    console.log(req.files);
    
    const imagePath = await storeImage(image, "books");
    const book = new Book({
      name,
      price,
      category,
      author,
      stock,
      image: imagePath,
    });

    await book.save();

    res.status(200).json({
      success: true,
      message: "Book added successfully!",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

exports.getBooks = async (req, res) => {
  try {
    console.log('###')
    const books = await Book.find();
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, category, author, stock } = req.body;
    let image = req.file;
    let book = await Book.findById(id);

    if (!book) {
      return res.status(400).json({
        success: false,
        message: "Book not found.",
      });
    }

    if (image) {
      const imagePath = await storeImage(image, "books");
      book.image = imagePath;
    }

    book.name = name;
    book.price = price;
    book.category = category;
    book.author = author;
    book.stock = stock;

    await book.save();

    res.status(200).json({
      success: true,
      message: "Book updated successfully!",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);
    if (!book)
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });

    await book.remove();

    res.status(200).json({
      success: true,
      message: "Book deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};