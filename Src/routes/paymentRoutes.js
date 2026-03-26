import express from 'express';
import {createOrder, verifyPayment} from '../controllers/paymentController.js';
import checkUsageLimit from '../middleware/checkUsageLimit.js';

const router = express.Router();

router.post("/create-order", checkUsageLimit, createOrder);
router.post("/verify",checkUsageLimit,verifyPayment);

export default router;