import User  from "../models/User.js"
export const GetAllUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user || !user.isAdmin) {
            return res.status(400).json({
                "message": "Only admins can access the details"
            });
        }
        const users = await User.find({_id: {$ne: userId}}).select("-password");
        return res.status(200).json({
            "message": "Users fetched successfully",
            "data": users
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}