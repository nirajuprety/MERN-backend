const Category = require('../models/model.category');



exports.list = async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            count: categories.length,
            message: "",
            data: categories,
        });
    }catch(err)
    {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
}

exports.store = async(req, res) => {
    const category = new Category({
        name: req.body.name,

      });
      category
        .save()
        .then((result) => {
          res.status(201).json({
            message: "category created successfully!",
            category: result,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
}


exports.delete = (req, res, next) => {
  Category.findByIdAndDelete(req.params.id)
    .then((category) => {
      if (!category) {
        return res.status(404).json({
          message: "Category not found!",
        });
      }
      res.status(200).json({
        message: "Category deleted successfully!",
        author: category,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
