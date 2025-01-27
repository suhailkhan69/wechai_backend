require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["https://wechai-nkh7fayoa-suhails-projects-da69a869.vercel.app"], // Replace with your frontend URL
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Gmail email
    pass: process.env.PASSWORD, // App Password (NOT your Gmail password)
  },
});

// Contact Form API Route
app.post("/send", async (req, res) => {
  const { name, email, contact, city, state, country, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: "suhailoxfo@gmail.com", // Change this to your receiving email
    subject: "New Contact Form Submission",
    text: `
      Name: ${name}
      Email: ${email}
      Contact: ${contact}
      City: ${city}
      State: ${state}
      Country: ${country}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ success: false, message: "Error sending email" });
  }
});

// Serverless Export for Vercel
module.exports = app;
