require("dotenv").config();
const nodemailer = require("nodemailer");

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your Gmail address
    pass: process.env.PASSWORD, // Use an App Password (not your Gmail password)
  },
});

// Contact Form API Route
module.exports = async (req, res) => {
  if (req.method === "POST") {
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
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};