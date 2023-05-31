const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    phoneNumber: {type: String, required: true},
    address: {type: String, required: true},
    password: { type: String, required: true, minlength: 3, maxlength: 1024 },
    isAdmin: { type: Boolean, default: false },
    isRider: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    comment: {type: Object},
    rating: {type: Number},
    count: {type: Number},
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

exports.User = User;
