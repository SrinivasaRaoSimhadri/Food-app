import express from "express";
import ConnectDB from "./config/ConnectDB.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRouter from "./routers/AuthRouter.js";
import ProfileRouter from "./routers/ProfileRouter.js";
import ItemsRouter from "./routers/ItemsRouter.js";
import CartRouter from "./routers/CartRouter.js";
import { protectRoute } from "./middlewares/ProtectRoute.js";
import AdminRouter from "./routers/AdminRouter.js";
import { GetOrderHistory } from "./controllers/CartController.js";
import AddressRouter from "./routers/AddressRouter.js";
import RazorpayRouter from "./routers/RazorpayRouter.js";
dotenv.config();


const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());


app.use("/auth", AuthRouter);
app.get("/orders", protectRoute, GetOrderHistory);
app.use("/profile", protectRoute, ProfileRouter);
app.use("/items", protectRoute, ItemsRouter);
app.use("/cart", protectRoute, CartRouter);
app.use("/admin", protectRoute, AdminRouter);
app.use("/address", protectRoute, AddressRouter);
app.use("/payments", protectRoute, RazorpayRouter);

const Start = async ()=> {
    try {
        await ConnectDB();
        app.listen(process.env.PORT, ()=>{
            console.log(`Server is running at the PORT: ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error.message);
    }    
}
Start();