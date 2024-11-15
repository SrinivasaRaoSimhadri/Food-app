import Item from "../models/Item.js";
import { validateItemDetails } from "../validators/validators.js";

export const PostItem = async (req, res) => {
    try {
        validateItemDetails(req);
        const { itemName, price, itemImage } = req.body;
        const newItem = await Item.create({
            itemName,
            price,
            itemImage
        });
        if(!newItem) {
            return res.status(400).json({
                "message": "Error in creating the newItem"
            })
        }
        return res.status(200).json({
            "message": "Posted item successfully",
            "data": newItem
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}

export const GetItems = async (req, res) => {
    try {
        const items = await Item.find({});
        if(items.length === 0) {
            return res.status(200).json({
                "message": "No items found"
            })
        }
        return res.status(200).json({
            "message": "Items fetched successfully",
            "data": items
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}

export const DeleteItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const item = await Item.findById(itemId);
        if(!item) {
            return res.status(400).json({
                "message": "Item does not exist"
            })
        }
        await item.deleteOne();
        return res.status(200).json({
            "message": "Item deleted successfully"
        })
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        })
    }
}