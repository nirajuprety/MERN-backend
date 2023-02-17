const mongoose = require("mongoose");
const categorySchema = require("./model.category"); 

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    // type: categorySchema,
    type : String,
    required: true
  },
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
