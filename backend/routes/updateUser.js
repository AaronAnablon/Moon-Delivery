const express = require('express');
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require('bcrypt');
const { isUser } = require('../middleware/auth');

router.put("/:id", isUser , async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password: hashedPassword, phoneNumber, address },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// RATE RIDER
router.put("/Rider/:id", isUser , async (req, res) => {
  try {
    const { rating, comment } = req.body;
     const existingAccount = await User.findById(req.params.id);
     const existingRating = existingAccount.rating
     const newRating = existingRating + rating;

      const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: { rating: newRating },
        $push: { comment: comment },
        $inc: { count: 1 },
      },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//GET HIGHRATING RIDER
router.get("/Rider/highRating", async (req, res) => {
  const rating = req.query.isRider;
  try {
    let rider;

    if (rating) {
      rider = await User.find({ rating: rating })
        .sort({ rating: -1 })
        .limit(10);
    } else {
      rider = await User.find().sort({ rating: -1 }).limit(10);
    }

    res.status(200).send(rider);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;