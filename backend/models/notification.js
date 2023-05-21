const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: {
        type: Object,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    notification: {
        type: String,
        required: true
    },
    payLoad: {
        type: Object,
      },

}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
