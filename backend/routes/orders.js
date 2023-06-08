const { Order } = require("../models/order");
const { isRider, isUser, isAdmin } = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");
const moment = require('moment');
const router = require("express").Router();

//CREATE

router.post("/:id", isAdmin, async (req, res) => {
  const { userId, name, products, total, shipping, rider, payment_status, image } = req.body;

  try {
    let uploadedImage = null;

    if (image) {
      // Upload image to Cloudinary
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        folder: "order image address",
        upload_preset: "online-shop",
      });
      console.log(uploadedResponse);

      // Add Cloudinary image URL to order
      uploadedImage = uploadedResponse.secure_url;
    }

    const newOrder = new Order({ userId, name, shipping, rider, products, total, payment_status, image: uploadedImage });
    const savedOrder = await newOrder.save();
    console.log(savedOrder);
    res.status(200).send(savedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating order" });
  }
});



//UPDATE
router.put("/:id/:orderId", isUser, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE
router.delete("/:id", isUser, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Order has been deleted...");
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET USER ORDERS
router.get("/find/:id/:status", isUser, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id, 
      $or: [
        { delivery_status: req.params.status },
        { delivery_status: 'pending' },
        ] });
    res.status(200).send(orders); 
  } catch (err) {
    res.status(500).send(err);
  }
});

//findDelivered

router.get("/findDelivered/:id", isUser, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id, 
     delivery_status: 'Delivered' ,
           });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});
//GET USER COMPLETED ORDERS
router.get("/findCompleted/:id", isUser, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id, 
      $or: [
        { delivery_status: 'Completed' },
        {delivery_status: 'Cancelled'},
      ]
           });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET ALL ORDERS

router.get("/", isAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});


//GET SELLER ORDERS

router.get("/seller-orders/:seller/:status", isAdmin, async (req, res) => {
  try {
    const orders = await Order.find({  products: {
      $elemMatch: {
        storeId: req.params.seller
      }
    },  $or: [
      { delivery_status: req.params.status },
      { delivery_status: 'Delivered' },
      {delivery_status: 'Cancelled'},
      {delivery_status: 'For Pick Up'},
      {delivery_status: 'For Delivery'},
    ] });
    res.status(200).send(orders);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});

//GET FOR DELIVERY ORDERS

router.get("/rider/:id/:deliveryStatus", isRider, async (req, res) => {
  try {
    const orders = await Order.find({ delivery_status: req.params.deliveryStatus });
    res.status(200).send(orders);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});


//GET RIDER SHIPMENT

router.get("/rider/:id/:delivery_status", isRider, async (req, res) => {
  try {
    const orders = await Order.find({ rider: {
      $elemMatch: {
        1: req.params.id
      }
    }, delivery_status: req.params.delivery_status});
    res.status(200).send(orders);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
})
// GET MONTHLY INCOME

router.get("/income/:id", isAdmin, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id, 
      $or: [
        { delivery_status: 'Completed' },
        {delivery_status: 'Cancelled'},
      ]
           });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});


//get orders-by-status-and-date
router.get('/orders-by-status-and-date', isAdmin, async (req, res) => {
  try {
    const startDate = moment().subtract(7, 'days').startOf('day'); // get the start date 7 days ago
    const endDate = moment().endOf('day'); // get the end date of today

    const completedOrders = await Order.countDocuments({ delivery_status: 'Delivered', createdAt: { $gte: startDate, $lte: endDate } });
    const cancelledOrders = await Order.countDocuments({ delivery_status: 'Cancelled', createdAt: { $gte: startDate, $lte: endDate } });
    const pendingOrders = await Order.countDocuments({ delivery_status: 'pending', createdAt: { $gte: startDate, $lte: endDate } });
    const forPickUpOrders = await Order.countDocuments({ delivery_status: 'For Pick Up', createdAt: { $gte: startDate, $lte: endDate } });

    const ordersByDate = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate.toDate(),
            $lte: endDate.toDate(),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' },
               },
          count: { $sum: 1 },
        },
        
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const data = {
      completedOrders,
      cancelledOrders,
      pendingOrders,
      ordersByDate,
      forPickUpOrders,
    };

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
