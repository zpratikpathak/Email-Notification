require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Email configuration
const primaryTransporter = nodemailer.createTransport({
  host: process.env.PRIMARY_SMTP_HOST,
  port: process.env.PRIMARY_SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.PRIMARY_SMTP_USER,
    pass: process.env.PRIMARY_SMTP_PASS,
  },
});

const backupTransporter = nodemailer.createTransport({
  host: process.env.BACKUP_SMTP_HOST,
  port: process.env.BACKUP_SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.BACKUP_SMTP_USER,
    pass: process.env.BACKUP_SMTP_PASS,
  },
});

// Email sending function with retry logic
async function sendEmailWithRetry(from, email, subject, text, retries = 0) {
  try {
    if (retries < 3) {
      await primaryTransporter.sendMail({
        from: from,
        to: email,
        subject: subject,
        text: text,
      });
      console.log("Email sent successfully using primary service");
    } else {
      await backupTransporter.sendMail({
        from: from,
        to: email,
        subject: subject,
        text: text,
      });
      console.log("Email sent successfully using backup service");
    }
  } catch (error) {
    if (retries < 3) {
      console.log(`Retry attempt ${retries + 1}`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
      return sendEmailWithRetry(from, email, subject, text, retries + 1);
    } else {
      throw new Error(
        "Failed to send email after 3 retries and backup attempt"
      );
    }
  }
}

// API endpoint for sending notifications
app.post("/send-notification", async (req, res) => {
  const { from, email, subject, text } = req.body;

  if (!from || !email || !subject || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await sendEmailWithRetry(from, email, subject, text);
    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
});

app.listen(port, () => {
  console.log(`Notification service listening at http://localhost:${port}`);
});
