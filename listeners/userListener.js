const eventBus = require('../events');
const sendEmailJob = require('../jobs/sendEmailJob');

eventBus.on('USER_LOGIN', async (user) => {
    console.log('Event received:', user);

    await sendEmailJob({
        to: user.email,
        subject: 'wellcome',
        text: 'Login success',
    });
});