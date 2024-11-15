import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    paymentStatus: {
        type: Boolean,
        default: false
    },
    items: {
        type: [
            {
                itemId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Item",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
            }
        ],
        default: []
    },
    totalPrice: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;