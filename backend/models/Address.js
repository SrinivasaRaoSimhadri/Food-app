import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    postalPin: {
        type: String,
        required: true,
        trim: true
    }
},{
    timestamps: true
})

const Address = mongoose.models.Address || mongoose.model("Address", addressSchema);
export default Address;