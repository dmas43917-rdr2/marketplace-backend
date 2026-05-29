require('dotenv').config();

const { Worker } = require('bullmq');
const transporter = require('../config/mailer');
const emailQueue = require('../queues/emailQueue');
const config = require('../config');

console.log('worker email berjalan...')

const worker = new Worker('emailQueue', async (job) => {
    try {
      console.log('worker menerima job:', job.data);

      const { to, subject, text } = job.data;

      const info = await transporter.sendMail({
        from: config.mail.user,
        to,
        subject,
        text,
    });

      console.log('Email terkirim ke:', info.messageId);
  
    } catch (err) {
    console.log('EMAIL ERROR:', err);
    }
  },
  
  {
    connection: {
        url: config.redisUrl,
    },
  }
);

