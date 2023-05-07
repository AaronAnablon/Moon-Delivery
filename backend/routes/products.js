const { Product } = require("../models/Product");
const { auth, isUser, isAdmin } = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");

const router = require("express").Router();

//CREATE

router.post("/", isAdmin, async (req, res) => {
  const { name, brand, desc, stores,storeId, address, rating, category, price, image } = req.body;
 
  try {
    if (image) {
      const uploadedResponse = await cloudinary.uploader
      .upload(image, {
        upload_preset: "online-shop",
       folder: "products"
      });
      console.log(uploadedResponse)
      if (uploadedResponse) {
        const uploadedImage = uploadedResponse.secure_url
        const product = new Product({
          name,
          brand,
          desc,
          stores,
          storeId,
          address,
          rating,
          category,
          price,
          image: uploadedImage,
        });
        const savedProduct = await product.save();
        res.status(200).send(savedProduct);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//DELETE

router.delete("/:id",  async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted...");
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET ALL PRODUCTS

router.get("/", async (req, res) => {
  const qbrand = req.query.brand;
  try {
    let products;

    if (qbrand) {
      products = await Product.find({
        brand: qbrand,
      }).sort({ createdAt: -1 });
    } else {
      products = await Product.find().sort({ createdAt: -1 });
    }

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get the highest Rating product
router.get("/highRating", async (req, res) => {
  const qbrand = req.query.brand;
  try {
    let products;

    if (qbrand) {
      products = await Product.find({
        brand: qbrand,
      }).sort({ rating: -1 });
    } else {
      products = await Product.find().sort({ rating: -1 });
    }

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});


//GET PRODUCT

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

//UPDATE

router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
