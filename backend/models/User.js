import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        min: 4
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        min: 4,
        max: 50
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    photoUrl: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png",
        validate: {
            validator: function(value) {
                return validator.isURL(value);
            },
            message: "Enter valid Profile URL"
        }
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
}

userSchema.methods.get_jwt = function () {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
    return token;
}

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;