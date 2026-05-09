const snap = require('../config/midtrans');

exports.createPayment = async (req, res) => {
    try {
        const { order_id, amount } = req.body;
        const parameter = {
            transaction_details: {
                order_id: `ORDER-${order_id}-${Date.now()}`,
                gross_amount: amount,
            },
            credit_card: {
                secure: true,
            },
            customer_details: {
                first_name: 'Dani',
                email: 'dani@gmail.com',
            },
        };

        const transaction = await snap.createTransaction(parameter);

        res.json({
            message: 'Payment Created',
            token: transaction.token,
            redirect_url: transaction.redirect_url,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.handleWebhook = async (req, res) => {
    try {
        const notification = req.body;

        console.log('webhook:', notification);

        const orderId = notification.order_id;
        const status = notification.transaction_status;

        if (status === 'settlememt') {
            console.log('Pembayaran sukses:', orderId);
        }

        if (status === 'pending') {
            console.log('Menunggu pembayaran:', orderId);
        }

        if (status === 'cancel' || status === 'expire') {
            console.log('Pembayaran gagal:', orderId);
        }

        res.status(200).json({ message: 'webhook received' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
