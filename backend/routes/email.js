const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

// API endpoint for sending email
router.post('/send-email', (req, res) => {
  const { recipientEmail, subject, text } = req.body;

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'moondeliveryifugao@gmail.com',
      pass: 'fkfmntvvilywkyij',
    },
  });

  const mailOptions = {
    from: 'moondeliveryifugao@gmail.com',
    to: recipientEmail,
    subject: subject,
    text: text,
  };
  
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent successfully' });
    }
  });
});

module.exports = router;
