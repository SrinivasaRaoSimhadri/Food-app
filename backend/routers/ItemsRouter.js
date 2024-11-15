import express from "express";
const router = express.Router();
import { GetItems, PostItem, DeleteItem } from "../controllers/ItemController.js";

router.get("/getItems", GetItems);
router.post("/postItem", PostItem);
router.delete("/deleteItem/:itemId", DeleteItem);

export default router;