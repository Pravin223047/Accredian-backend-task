const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");

const prisma = new PrismaClient();

const routes = (app) => {
  app.post("/api/referrals", async (req, res) => {
    const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

    // Simple validation (you can add more complex validation as needed)
    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      const referral = await prisma.referral.create({
        data: { referrerName, referrerEmail, refereeName, refereeEmail },
      });

      // Send email to referrer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const referrerMailOptions = {
        from: process.env.GMAIL_USER,
        to: referrerEmail,
        subject: "Referral Submitted",
        text: `Thank you for referring ${refereeName}! Here is the referral link: https://accredian.pages.dev`,
      };

      transporter.sendMail(referrerMailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email to referrer:", error);
        }
      });

      // Send email to referee
      const refereeMailOptions = {
        from: process.env.GMAIL_USER,
        to: refereeEmail,
        subject: "You've been referred!",
        text: `${referrerName} has referred you. Here is the referral link: https://accredian.pages.dev`,
      };

      transporter.sendMail(refereeMailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email to referee:", error);
        }
      });

      // Respond with success message
      res.status(200).json({ message: "Referral submitted successfully." });
    } catch (error) {
      console.error("Error creating referral:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  });
};

module.exports = routes;
