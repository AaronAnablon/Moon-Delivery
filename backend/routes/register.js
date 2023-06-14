const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const generateAuthToken = require("../utils/generateAuthToken");
const router = express.Router();


router.post("/verify-email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.send("Email already exists.Please choose another Email");
  } catch (error) {
    console.log(error)
  }
})

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    phoneNumber: Joi.string().min(9).max(12).required(),
    address: Joi.string().min(3).max(400).required(),
    password: Joi.string().min(6).max(200).required(),
    isAdmin: Joi.boolean(),
    isRider: Joi.boolean(),
    active: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Email already exists.Please choose another one..");
  const { name, email, phoneNumber, address, password, isAdmin, isRider, active } = req.body;

  user = new User({ name, email, phoneNumber, address, password, isAdmin, isRider, active });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = generateAuthToken(user);

  res.send(token);
});

router.put("/password", async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const encryptPassword = await bcrypt.hash(password, salt);

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { password: encryptPassword } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('updated')
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
