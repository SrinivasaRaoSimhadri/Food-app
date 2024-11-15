import User from "../models/User.js";
import { validateEditProfile } from "../validators/validators.js";

export const GetUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password");
        return res.status(200).json({
            "message": "Profile fetched successfully",
            "data": user
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}

export const EditProfile = async (req, res) => {
    try {
        validateEditProfile(req);
        const userId = req.user._id;
        const { fullName, userName, photoUrl } = req.body;
        const updatesUser = await User.findByIdAndUpdate(userId, { fullName, userName, photoUrl }, {runValidators: true, new: true});
        return res.status(200).json({
            "message": "Profile edited successfully",
            "data": updatesUser
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}

