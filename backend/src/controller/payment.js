import express from 'express';
import axios from 'axios';
import Payment from '../models/paymentModel.js';

const router = express.Router();

// Fetch payment history
router.get('/payments', async (req, res) => {
  try {
    const userId = req.user.id; // Assuming JWT middleware
    const payments = await Payment.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments' });
  }
});

// Process a new payment
router.post('/payments', async (req, res) => {
  const { amount, description } = req.body;

  try {
    const chapaResponse = await axios.post('https://api.chapa.co/v1/transaction/initialize', {
      amount,
      currency: 'ETB',
      email: req.user.email,
      tx_ref: `tx-${Date.now()}`,
      callback_url: 'http://your-site.com/payment-confirmation',
      return_url: 'http://your-site.com/payment-success',
      customizations: {
        title: 'Payment for Services',
        description,
      },
    }, {
      headers: { Authorization: `Bearer ${process.env.CHAPA_API_KEY}` },
    });

    // Save the transaction to the database
    const payment = new Payment({
      userId: req.user.id,
      amount,
      description,
      status: 'Pending',
      chapaRef: chapaResponse.data.data.tx_ref,
    });
    await payment.save();

    res.status(200).json({ success: true, message: 'Payment initialized', redirectUrl: chapaResponse.data.data.checkout_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Payment initialization failed' });
  }
});

// Chapa webhook for payment confirmation
router.post('/payments/webhook', async (req, res) => {
  try {
    const { tx_ref, status } = req.body;

    const payment = await Payment.findOne({ chapaRef: tx_ref });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    payment.status = status === 'success' ? 'Completed' : 'Failed';
    await payment.save();

    res.status(200).json({ success: true, message: 'Payment status updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Webhook handling failed' });
  }
});

export default router;
