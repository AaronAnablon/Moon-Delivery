const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: Object,
    ref: 'User',
    required: true
  },
  motorcycle: {
    type: Object,
    ref: 'Motorcycle',
    required: true
  },
  endDate: {
    type: Date,
  },
  booking: {
    type: Object,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
