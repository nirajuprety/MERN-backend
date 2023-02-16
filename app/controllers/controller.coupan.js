const Coupon = require('../models/model.coupon');

exports.list = async (req, res) => {
    try{
        const coupons  = await Coupon.find();
        res.status(200).json({
            success: true,
            count: coupons.length,
            message: "",
            data: coupons,
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
    const coupon = new Coupon({
      name: req.body.name,
      code : req.body.code,
      expire_date : req.body.expire_date,
      discount_percent : req.body.discount_percent,
      start_date : req.body.start_date,
      max_amount : req.body.max_amount,
    });
    console.log("herhe");
      coupon
        .save()
        .then((result) => {
          res.status(201).json({
            message: "coupon created successfully!",
            coupon: result,
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
  Coupon.findByIdAndDelete(req.params.id)
    .then((coupon) => {
      if (!coupon) {
        return res.status(404).json({
          message: "Coupon not found!",
        });
      }
      res.status(200).json({
        message: "Category deleted successfully!",
        coupon: coupon,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
