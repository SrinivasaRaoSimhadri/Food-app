import express from "express";
import { GetAllUsers } from "../controllers/AdminController.js";
const router = express();

router.get("/users", GetAllUsers);
export default router;