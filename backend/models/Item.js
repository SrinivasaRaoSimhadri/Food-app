import mongoose from "mongoose";
import validator from "validator";
const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    itemImage: {
        type: String,
        required: true,
        validate: {
            validator: function(url) {
                return validator.isURL(url);
            },
            message: "Enter valid image URL"
        }
    }
},{
    timestamps: true
});

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);
export default Item;