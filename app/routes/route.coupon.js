const express = require("express");
const router = express.Router();
const couponController = require("../controllers/controller.coupan");

// Create an coupon
router.post("/create", couponController.store);

// Get all coupons
router.get("/", couponController.list);

// Delete an coupon
router.delete("/:id", couponController.delete);

module.exports = router;
