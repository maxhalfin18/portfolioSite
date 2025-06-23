const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// API לשליחת מייל מהטופס
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  // הגדרות nodemailer (Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'maxhalfin18@gmail.com', // החלף למייל שלך
      pass: 'bnaf owra njmb xocf'    // סיסמת אפליקציה (לא סיסמת Gmail רגילה)
    }
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'maxhalfin18@gmail.com',
      subject: `Contact Form - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
});

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
}); 