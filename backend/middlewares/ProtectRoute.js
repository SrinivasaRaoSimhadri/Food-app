import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const protectRoute = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token) {
            return res.status(400).json({
                "message": "Unothorized"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decoded;
        const user = await User.findById(_id);
        if(!user) {
            return res.status(401).json({
                "message": "Unthorozed"
            })
        }
        req.user = user;
        next(); 
    } catch (error) {
        return res.status(401).json({
            "message": "Unothorized"
        })
    }
}