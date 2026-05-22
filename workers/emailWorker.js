require('dotenv').config()
const { Worker } = require('bullmq');
const transporter = require('../config/mailer');
const config = require('../config');

const worker = new Worker('emailQueue', async (job) => {
    const { to, subject, text } = job.data;

    await transporter.sendMail({
        from: config.user,
        to,
        subject,
        text,
    });

    console.log('Email terkirim ke:', to);
  },
  {
    connection: {
        url: config.redisUrl,
    },
  }
);
