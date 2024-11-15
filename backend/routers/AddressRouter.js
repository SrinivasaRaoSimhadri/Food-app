import express from "express";
import { GetAddress, PostAddress } from "../controllers/AddressController.js";
const router = express.Router();

router.get("/getaddress", GetAddress);
router.post("/addaddress", PostAddress);

export default router; 