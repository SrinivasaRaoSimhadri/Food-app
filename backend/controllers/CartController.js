import Cart from "../models/Cart.js";
import Item from "../models/Item.js";


export const GetCart  = async (req, res) => {
    try {
        const userId = req.user._id;
        let cart = await Cart.findOne({ user: userId, paymentStatus: false});
        if(!cart) {
            cart = await new Cart({
                user: userId
            })
            await cart.save();
        }
        const populatedCart = await cart.populate("items.itemId");
        return res.status(200).json({
            "message": "Cart fetched successfully",
            "data": populatedCart
        });
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}



export const AddItemToCart = async (req, res) => {
    try {
        const { itemId } = req.params;
        const userId = req.user._id;
        const addedItem = await Item.findById(itemId);
        if(!addedItem) {
            return res.status(400).json({
                "message": "Item not found"
            });
        }
        const itemPrice = addedItem.price;
        let cart = await Cart.findOne({user: userId,  paymentStatus: false});
        if(!cart) {
            cart = await new Cart({
                user: userId
            })
            await cart.save();
        }
        const itemIndex = cart.items.findIndex((item)=> {
            return item.itemId.toString() === itemId;
        })
        if(itemIndex === -1) {
            cart.items.push({itemId,quantity: 1});
        } else {
            cart.items[itemIndex].quantity =  cart.items[itemIndex].quantity + 1; 
        }
        cart.totalPrice = Number(cart.totalPrice) + Number(itemPrice);
        await cart.save();
        const populatedcart = await cart.populate("items.itemId");
        return res.status(200).json({
            "message": "item added to cart successfully",
            "data": populatedcart
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}

export const removeItemFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { itemId } = req.params;
        const cart = await Cart.findOne({user: userId, paymentStatus: false});
        if(!cart) {
            return res.status(400).json({
                "message": "Add items to remove from cart"
            })
        };
        const removedItem = await Item.findById(itemId);
        if(!removedItem) {
            return res.status(400).json({
                "message": "Item not found to remove"
            })
        }
        const itemPrice = removedItem.price;
        const itemIdex = cart.items.findIndex((item) => {
            return item.itemId.toString() === itemId;
        });
        if(itemIdex === -1) {
            return res.status(400).json({
                "message": "Add item to remove item from cart"
            })
        }
        if(cart.items[itemIdex].quantity > 1) {
            cart.items[itemIdex].quantity = cart.items[itemIdex].quantity - 1;
        } else {
            cart.items.splice(itemIdex, 1);
        }
        cart.totalPrice = cart.totalPrice - itemPrice;
        await cart.save();
        const populatedcart = await cart.populate("items.itemId");
        return res.status(200).json({
            "message": "Item removed from cart successfully",
            "data": populatedcart
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}

export const GetOrderHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        let carts = await Cart.find({user: userId, paymentStatus: true});
        if(!carts || carts.length === 0) {
            return res.status(200).json({
                "message": "Not ordered yet"
            })
        };
        carts = carts.sort((a,b) => b.createdAt - a.createdAt);
        return res.status(200).json({
            "message": "Previous orders fetched successfully",
            "data": carts
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}