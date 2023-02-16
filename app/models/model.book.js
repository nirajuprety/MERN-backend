const mongoose = require("mongoose");
const Category = require("./model.category"); 

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: Category.schema,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model("Book", bookSchema);
