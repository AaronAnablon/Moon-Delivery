const { Product } = require("../models/product");
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

//GET SELLER'S PRODUCTS

router.get("/seller/:sellerId", async (req, res) => {
  const sellerId = req.params.sellerId;

  try {
    const products = await Product.find({ storeId: sellerId });

    if (products.length > 0) {
      res.status(200).send({
        products
      });
    } else {
      res.status(404).send("No products found for the given seller");
    }
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

//GET SIMILAR PRODUCTSS 
const PAGE_SIZE = 10; // Number of items to load per page

router.get('/searchSimilar', async (req, res) => {
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
    const paginatedResults = results
      .slice(0, PAGE_SIZE) // Get the first PAGE_SIZE items initially
      .map((result) => result.item);

    res.json({ data: paginatedResults, total: results.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
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

//get the highest Sold product
router.get("/highSold", async (req, res) => {
  const qbrand = req.query.brand;
  try {
    let products;

    if (qbrand) {
      products = await Product.find({ brand: qbrand })
        .sort({ count: -1 })
        .limit(10);
    } else {
      products = await Product.find().sort({ count: -1 }).limit(10);
    }

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
    console.log(error)
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
  } catch (error) {ng
    console.log(error)
    res.status(500).send(error);
  }
});


module.exports = router;
