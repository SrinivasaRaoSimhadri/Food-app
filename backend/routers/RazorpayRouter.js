import express from  "express";
import { razorpayment, successpayment } from "../controllers/RazorpayController.js";
const router = express.Router();
  
router.post('/create-order', razorpayment);
router.post('/payment-success', successpayment);

export default router;