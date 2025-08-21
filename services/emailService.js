const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

// dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

async function sendEmail(name, email, date, time, meetLink) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Appointment Confirmation",
    html: `
      <h3>Appointment Confirmation</h3>
      <p>Hello ${name},</p>
      <p>Your appointment is scheduled on <strong>${date}</strong> at <strong>${time}</strong>.</p>
      <p>Here is your Jitsi Meet link: <a href="${meetLink}">${meetLink}</a></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendEmail };
