const nodemailer = require('nodemailer');
const config = require('../config/index')

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  }
});

module.exports = transporter