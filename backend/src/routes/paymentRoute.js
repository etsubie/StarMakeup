import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { initializePayment, verifyPayment } from '../controller/paymentController.js';

const paymentRoute = express.Router();

paymentRoute.post(
  '/initialize',
  verifyToken,
  initializePayment
);

paymentRoute.post(
  '/verify',
  verifyToken,
  verifyPayment
);

export default paymentRoute;

