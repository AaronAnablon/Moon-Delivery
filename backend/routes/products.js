const { Product } = require("../models/Product");
const { auth, isUser, isAdmin } = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");
const Fuse = require('fuse.js');

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

//GET 10 PRODUCTS
router.get("/increment", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page, default to 1
  const limit = 2; // Number of items to display per page
  const qbrand = req.query.brand;

  try {
    let products;
    let count;

    if (qbrand) {
      products = await Product.find({ brand: qbrand })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit) // Skip items already displayed on previous pages
        .limit(limit); // Get only the items for the current page

      count = await Product.countDocuments({ brand: qbrand });
    } else {
      products = await Product.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      count = await Product.countDocuments();
    }

    const totalPages = Math.ceil(count / limit); // Total number of pages

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
    const products = await Product.find();

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
  const qbrand = req.query.brand;
  try {
    let products;

    if (qbrand) {
      products = await Product.find({ brand: qbrand })
        .sort({ rating: -1 })
        .limit(10);
    } else {
      products = await Product.find().sort({ rating: -1 }).limit(10);
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
