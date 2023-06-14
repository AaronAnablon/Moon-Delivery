const { Product } = require("../models/product");
const { isAdmin } = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");
const Fuse = require('fuse.js');

const router = require("express").Router();

//CREATE

router.post("/", isAdmin, async (req, res) => {
  const { name, brand, desc, stores, storeId, address, rating, category, price, image } = req.body;
  try {
    if (image) {
      const uploadedImages = [];

      for (const img of image) {
        const uploadedResponse = await cloudinary.uploader.upload(img, {
          upload_preset: "online-shop",
          folder: "products"
        });
        
        uploadedImages.push(uploadedResponse.secure_url);
      }
      console.log(uploadedImages)
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
        image: uploadedImages,
      });

      const savedProduct = await product.save();
      res.status(200).send(savedProduct);
    } else {
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
      });

      const savedProduct = await product.save();
      res.status(200).send(savedProduct);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


//DELETE

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted...");
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET SELLER'S PRODUCTS

router.get("/seller/:sellerId", isAdmin, async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const products = await Product.find({ storeId: sellerId, desc: { $ne: "deleted" } });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});


//GET 10 PRODUCTS
router.get("/increment", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page, default to 1
  const limit = 10; // Number of items to display per page
  const qbrand = req.query.brand;

  try {
    let products;
    let count;

    const query = { desc: { $ne: "deleted" } }; // Exclude products with desc value "deleted"

    if (qbrand) {
      query.brand = qbrand;
      products = await Product.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      count = await Product.countDocuments(query);
    } else {
      products = await Product.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      count = await Product.countDocuments(query);
    }

    const totalPages = Math.ceil(count / limit);

    res.status(200).send({
      products,
      page,
      totalPages,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});


//get search 
router.get('/search', async (req, res) => {
  try {
    const query = req.query.keyword;
    const products = await Product.find({ desc: { $ne: "deleted" } });

    const options = {
      keys: ['name', 'description'], // The properties of the Product model to search in
      threshold: 0.3, // The minimum score a result must have to be considered a match
      ignoreLocation: true, // Ignore where the query matches in the string
      includeScore: true, // Include the score of each result in the output
    };

    const fuse = new Fuse(products, options);

    const results = fuse.search(query);
    res.json(results.map((result) => result.item));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


//get the highest Rating product
router.get("/highRating", async (req, res) => {
  try {
    const products = await Product.find({ desc: { $ne: "deleted" } })
      .sort({ rating: -1 })
      .limit(10);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});


//get the highest Sold product
router.get("/highSold", async (req, res) => {
  try {
    const products = await Product.find({ desc: { $ne: "deleted" } })
      .sort({ count: -1 })
      .limit(10);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
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

//UPDATE PRODUCT AS SELLER

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

//SUBMIT RATING
router.put("/submitRating/:id", async (req, res) => {
  try {
    const { rating } = req.body;
    const existingProduct = await Product.findById(req.params.id);
    const existingRating = existingProduct.rating;
    const newRating = +existingRating.rating + +rating.rating;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: { "rating.rating": newRating },
        $push: { "rating.comment": rating.comment },
        $inc: { "rating.count": 1 },
      },
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    ng
    console.log(error)
    res.status(500).send(error);
  }
});


module.exports = router;
