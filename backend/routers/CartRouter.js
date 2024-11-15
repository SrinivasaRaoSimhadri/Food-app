import express from "express";
import { AddItemToCart, GetCart, GetOrderHistory, removeItemFromCart } from "../controllers/CartController.js";
const router = express.Router();

router.get("/getcart", GetCart);
router.post("/add/:itemId", AddItemToCart);
router.post("/remove/:itemId", removeItemFromCart)
router.get("/orderhistory", GetOrderHistory);

export default router;