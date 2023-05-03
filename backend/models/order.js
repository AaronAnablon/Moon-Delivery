const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    products: [
      { sellerId: { type: String }, productId: { type: String }, quantity: { type: Number, default: 1 } },
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, default: "pending" },
    rider: { type: Object,  default: "pending" },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
    image: { type: Object }, 
  },
    { timestamps: { currentTime: () => new Date().getTime() + 28800000 } }
);

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;
