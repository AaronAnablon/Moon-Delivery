const express = require('express');
const router = express.Router();
const { User } = require("../models/user");

//GET HIGHRATING RIDER
router.get("/riderRating/:id", async (req, res) => {
    try {
        const ratings = await User.find({ _id: req.params.id })

        res.status(200).send(ratings);
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
});

module.exports = router;