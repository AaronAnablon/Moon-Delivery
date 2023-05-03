const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true},
    desc: { type: String, required: true },
    stores: {type: String, required: true},
    storeId: {type: String, required: true},
    address: {type: String, required: true},
    rating: { type: Object, required: true},
    category: { type: String, required: true},
    price: { type: Number, required: true },
    image: { type: Object, required: true },
  },
  { timestamps: { currentTime: () => new Date().getTime() + 28800000 } }
);

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
