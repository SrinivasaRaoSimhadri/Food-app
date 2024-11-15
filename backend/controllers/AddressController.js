import Address from "../models/Address.js";
import { validateAddressData } from "../validators/validators.js";

export const GetAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const address = await Address.findOne({user: userId});
        if(!address) {
            return res.status(400).json({
                "message": "No address found"
            });
        }
        return res.status(200).json({
            "message": "Address fetched successfully",
            "data": address
        });
    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}

export const PostAddress = async (req, res) => {
    try {
        validateAddressData(req);
        const userId = req.user._id;
        const { street, city, state, country, postalPin } = req.body;
        const address = await Address.findOne({user: userId});
        if(!address) {
            const addedAddress = new Address({
                user: userId,
                street, 
                city, 
                state, 
                country, 
                postalPin
            })
            await addedAddress.save();
            return res.status(200).json({
                "message": "Address saved successfully",
                "data": addedAddress
            });
        }
        address.street = street;
        address.city = city;
        address.state = state;
        address.country = country;
        address.postalPin = postalPin;
        const newAddress = await address.save(); 
        return res.status(200).json({
            "message": "Address saved successfully",
            "data": newAddress
        });

    } catch (error) {
        return res.status(400).json({
            "message": error.message
        });
    }
}