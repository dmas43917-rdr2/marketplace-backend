require('dotenv').config()
const { Worker } = require('bullmq');
const transporter = require('../config/mailer');

const worker = new Worker('emailQueue', async (job) => {
    const { to, subject, text } = job.data;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    });

    console.log('Email terkirim ke:', to);
  },
  {
    connection: {
        host: '127.0.0.1',
        port: 6379,
    },
  }
);
