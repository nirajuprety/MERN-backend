const express = require("express");
const router = express.Router();
const BannerController = require('../controllers/controller.banner');

router.post("/create", BannerController.createBanner);

// Get all Banners
router.get("/", BannerController.getBanners);

// Get a single Banner
router.get("/:id", BannerController.getBanner);


// Delete an Banner
router.delete("/:id", BannerController.deleteBanner);

module.exports = router;