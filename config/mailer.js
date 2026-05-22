const nodemailer = require('nodemailer');
const config = require('../config')

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: config.user,
    pass: config.pass,
  }
});

module.exports = transporter