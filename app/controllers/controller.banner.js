const Banner = require("../models/model.banner");

const storeImage = require("../helpers/fileUploadHelper");

exports.createBanner = async (req, res) => {
  try {
    console.log(req.files);

    const { name } = req.body;
    const image = req.files.image
    
    console.log(req.files);
    
    const imagePath = await storeImage(image, "banners");
    const banner = new Banner({
      name,
      image: imagePath,
    });

    await banner.save();

    res.status(200).json({
      success: true,
      message: "Banner added successfully!",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

exports.getBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({
      success: true,
      count: banners.length,
      data: banners,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};


exports.deleteBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;

    const banner= await Banner.findById(bannerId);
    if (!banner)
      return res.status(404).json({
        success: false,
        message: "Banner not found.",
      });

    await banner.remove();

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};