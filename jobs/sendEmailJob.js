const emailQueue = require('../queues/emailQueue');

const sendEmailJob = async (data) => {
    console.log('job masuk queue');
    
    await emailQueue.add(
        'send-email',
        data,
        {
            attempts: 3,
            delay: 5000,
            removeOnComplete: true,
            removeOnFail: false,
        }
    );
};

module.exports = sendEmailJob;