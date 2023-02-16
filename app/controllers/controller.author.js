// controllers/authorController.js
const Author = require("../models/model.author");

exports.createAuthor = (req, res, next) => {
 console.log(req.body)
  const author = new Author({
    name: req.body.name,
    address: {
      city: req.body.address.city,
      state: req.body.address.state,
      country: req.body.address.country,
    },
  });
  author
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Author created successfully!",
        author: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.getAuthors =async (req, res, next) => {
  try{
    const authors = await Author.find();
    res.status(200).json({
        success: true,
        count: authors.length,
        message: "",
        data: authors,
    });
}catch(err)
{
    res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message
    });
}
};


exports.getAuthor = (req, res, next) => {
  Author.findById(req.params.id)
    .then((author) => {
      if (!author) {
        return res.status(404).json({
          message: "Author not found!",
        });
      }
      res.status(200).json({
        message: "Author fetched successfully!",
        author: author,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.updateAuthor = (req, res, next) => {
  Author.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        address: {
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
        },
      },
    },
    { new: true }
  )
    .then((author) => {
      if (!author) {
        return res.status(404).json({
          message: "Author not found!",
        });
      }
      res.status(200).json({
        message: "Author updated successfully!",
        author: author,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.deleteAuthor = (req, res, next) => {
  Author.findByIdAndDelete(req.params.id)
    .then((author) => {
      if (!author) {
        return res.status(404).json({
          message: "Author not found!",
        });
      }
      res.status(200).json({
        message: "Author deleted successfully!",
        author: author,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
