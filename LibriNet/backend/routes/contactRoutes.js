const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Konfiguro transporter me Gmail SMTP dhe App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Sarandatahiraj33@gmail.com',    // vendos email-in tënd Gmail
    pass: 'fbln jutl mmaz iazo'     // vendos këtu App Password të Gmail
  }
});

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'info@librinet.com',    // emaili ku do të merren mesazhet
      subject: subject || 'New Contact Message from LibriNet',
      text: message,
    });

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

module.exports = router;
