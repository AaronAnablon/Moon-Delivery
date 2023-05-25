const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');

// Create a new notification
router.post('/', async (req, res) => {
  try {
    const { user, email, notification, payLoad } = req.body;
    const newNotification = new Notification({ user, email, notification, payLoad });
    const savedNotification = await newNotification.save();
    res.json(savedNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//GET NOTIF READ FALSE
router.get('/notification/:id', async (req, res) => {
  try {
    const notification = await Notification.find({
      user : req.params.id,
      'payLoad.read': false,
    });
    if (!notification) {
      return res.status(404).json({ error: 'Bookings not found' });
    }
    res.json(notification.reverse());
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

//UPDATE READ
router.put('/update/:notifId', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.notifId,
      { 'payLoad.read': req.body.payLoad.read },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Get a USER NOTIF ID
router.get('/:id', async (req, res) => {
  try {
    const notification = await Notification.find({
      user : req.params.id,
    });
    if (!notification) {
      return res.status(404).json({ error: 'Bookings not found' });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

// Delete a notification by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(req.params.id);
    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
