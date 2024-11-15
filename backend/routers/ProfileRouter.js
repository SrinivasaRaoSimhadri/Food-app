import express from "express";
import { EditProfile, GetUserProfile } from "../controllers/ProfileController.js";
const router = express.Router();

router.get("/", GetUserProfile);
router.post("/edit", EditProfile);

export default router;