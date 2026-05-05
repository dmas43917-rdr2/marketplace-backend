require('dotenv').config();
const nodemailer = require('nodemailer');

/*const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});*/

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "60262e69cec436",
    pass: "8aa2692698c89c"
  }
});

module.exports = transporter