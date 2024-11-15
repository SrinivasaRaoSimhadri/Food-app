import Razorpay from "razorpay";
import Cart from "../models/Cart.js";

export const razorpayment = async (req, res) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID, 
        key_secret: process.env.RAZORPAY_KEY_SECRET, 
    });
    const { amount, currency, receipt, notes } = req.body;
    try {
        const options = {
            amount: amount * 100, 
            currency: currency,
            receipt: receipt,
            notes: notes,
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ message: 'Could not create order', error: error.message });
    }
};

export const successpayment = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({user: userId, paymentStatus: false});
        cart.paymentStatus = true;
        await cart.save();
        res.redirect("http://localhost:5173/orders");
    } catch (error) {
        
    }
}