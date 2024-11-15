import User from "../models/User.js";
import bcrypt from "bcrypt";
import { validateUserLoginDetails, validateUserSignupDetails } from "../validators/validators.js"

export const Login = async (req, res) => {
    try {
        validateUserLoginDetails(req);
        const { userName, password } = req.body;
        const user = await User.findOne({userName: userName});
        if(!user) {
            return res.status(400).json({
                "message": "Invalid credintials"
            })
        }
        const isValidPassword = await user.isValidPassword(password);
        if(!isValidPassword) {
            return res.status(400).json({
                "message": "Invalid credintials"
            })
        } 
        const token = user.get_jwt();
        res.cookie("token", token);
        const {password:_, ...loggedUser} = user.toObject();
        return res.status(200).json({
            "message": "User logged in successfully",
            "data": loggedUser
        })
    } catch (error) {
        res.status(400).json({
            "message": error.message
        })
    }
}

export const Signup = async (req, res) => {
    try {   
        validateUserSignupDetails(req);
        const { fullName, userName, password } = req.body;
        const doesUserExists = await User.findOne({userName: userName});
        if(doesUserExists) {
            res.status(200).json({
                "message": "userName already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword
        })
        await newUser.save();
        return res.status(200).json({
            "message": "user signedup successfully"
        })
    } catch (error) {
        res.status(400).json({
            "message": error.message
        })
    }
}

export const Logout = async (req, res) => {
    try {
        res.cookie("token", null, {expires : new Date(Date.now())});
        return res.status(200).json({
            "message": "Logged out user successfully"
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}