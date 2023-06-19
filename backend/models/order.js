const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    products: [
      { sellerName: { type: String }, 
      productId: { type: String }, 
      quantity: { type: Number, 
        default: 1 },
        image: { type: String }, 
        name: { type: String }, 
        price: { type: Number }, 
        address: { type: String }, 
        sellerNumber: { type: String }, 
        sellerId: { type: String }, 
        deliveryStatus: { type: String }, 
      },
    ],
    total: { type: Number, required: true },
    shipping: { type: Object, default: "pending" },
    rider: { type: Object,  default: "pending" },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
    updated_at: { type: String },
    image: { type: Object }, 
  },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;
