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

module.exports = router;