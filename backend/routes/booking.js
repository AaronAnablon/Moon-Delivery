const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { user, motorcycle, endDate, booking } = req.body;
    const bookingData = { user, motorcycle, endDate, booking };
    const booked = new Booking(bookingData);
    await booked.save();

    res.status(201).json(booking);
    console.log(booking)
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error)
  }
});

//GET RIDER BOOKING COMPLETED
router.get('/rider/Arrived/:riderId', async (req, res) => {
  try {
    const bookings = await Booking.find({
      "booking.booking.riderId": req.params.riderId,
      "booking.booking.riderDelete": false,
      $or: [
        { "booking.booking.status": 'Completed' },
        { "booking.booking.status": 'Arrived' },
      ]
    },
    );
    if (!bookings) {
      return res.status(404).json({ error: 'Bookings not found' });
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});
// Get all bookings
router.get('/:status', async (req, res) => {
  try {
    const bookings = await Booking.find({ "booking.booking.status": req.params.status });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get a Rider booking by ID and For Pick Up
router.get('/rider/ForPickUp/:id', async (req, res) => {
  try {
    const bookings = await Booking.find({
      "booking.booking.riderId": req.params.id,
      "booking.booking.riderDelete": false,
      "booking.booking.status": 'For Pick Up',
    });
    if (!bookings) {
      return res.status(404).json({ error: 'Bookings not found' });
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

//GET RIDER BOOKING DATA
router.get('/rider/summary/:id', async (req, res) => {
  const DateFormatDb = (date) => {
    return( new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        }))
}
  try {

    const bookings = await Booking.find({
      "booking.booking.riderId": req.params.id,
      "booking.completedAt": DateFormatDb(new Date()),
      $or: [
        { "booking.booking.status": 'Completed' },
        { "booking.booking.status": 'Arrived' },
      ],
    });

    if (!bookings) {
      return res.status(404).json({ error: 'Bookings not found' });
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});


// Get a Rider booking by ID and Status
router.get('/:id/:status', async (req, res) => {
  try {
    const bookings = await Booking.find({
      "booking.booking.riderId": req.params.id,
      "booking.booking.riderDelete": false,
      $or: [
        { "booking.booking.status": req.params.status },
        { "booking.booking.status": 'For Pick Up' },
        { "booking.booking.status": 'Arrived' },
      ],
    });
    if (!bookings) {
      return res.status(404).json({ error: 'Bookings not found' });
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});



// Update a booking by ID
router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a booking by ID
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//GET NOT RATED BOOKING
router.get('/user/Arrived/:id', async (req, res) => {
  try {
    const bookings = await Booking.find({
      "user._id": req.params.id,
      "booking.booking.userDelete": false,
      $or: [
        { "booking.booking.status": 'Arrived' },
      ]
    },
    );
    if (!bookings) {
      return res.status(404).json({ error: 'Bookings not found' });
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});





//GET User BOOKING COMPLETED
router.get('/user/Completed/:id', async (req, res) => {
  try {
    const bookings = await Booking.find({
      "user._id": req.params.id,
      "booking.booking.userDelete": false,
      $or: [
        { "booking.booking.status": 'Completed' },
      ]
    },
    );
    if (!bookings) {
      return res.status(404).json({ error: 'Bookings not found' });
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});
// Get a User booking by ID and Status
router.get('/user/:id/:status', async (req, res) => {
  try {
    const bookings = await Booking.find({
      "user._id": req.params.id,
      "booking.booking.userDelete": false,
      $or: [
        { "booking.booking.status": req.params.status },
        { "booking.booking.status": 'For Pick Up' },
        { "booking.booking.status": 'Cancelled' },
        { "booking.booking.status": 'Arrived' },
      ]
    },
    );
    if (!bookings) {
      return res.status(404).json({ error: 'Bookings not found' });
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});


module.exports = router;
