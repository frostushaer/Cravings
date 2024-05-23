import { User } from "../models/user.js";
import { Address } from "../models/address.js";

export const addAddress = async (req, res, next) => {
    try {
        const newAddress = new Address({
            userId: req.user.id,
            addressLine1: req.body.addressLine1,
            postalCode: req.body.postalCode,
            default: req.body.default,
            deliveryInstructions: req.body.deliveryInstructions,
            latitude: req.body.latitude,
            longitued: req.body.longitued,
        });

        if (req.body.default === true) {
            await Address.updateMany({userId: req.user.id}, {default: false});
        }
        
        await newAddress.save();
        res.status(201).json({success: true, message: "Address successfully added"});

    } catch (error) {
        next(error);
    }
};

export const getAddresses = async (req, res, next) => {
    try {
        const addresses = await Address.find({userId: req.user.id});
        res.status(200).json({success: true, message: addresses});

    } catch (error) {
        next(error);
    }
};

export const deleteAddress = async (req, res, next) => {
    try {
        await Address.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, message: "Address successfully deleted"});

    } catch (error) {
        next(error);
    }
};

export const setDefaultAddress = async (req, res, next) => {
    try {
        const addressId = req.params.id;
        const userId = req.user.id;

        await Address.updateMany({userId: userId}, {default: false});

        const updatedAddress = await Address.findByIdAndUpdate(addressId, {default: true});

        if(updatedAddress) {
            await User.findByIdAndUpdate(userId, {address: addressId});
            res.status(200).json({success: true, message: "Default address successfully updated"});
        } else {
            res.status(400).json({success: false, message: "Address not found"});
        }
    } catch (error) {
        next(error);
    }
};

export const getDefaultAddress = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const address = await Address.findOne({userId: userId, default: true});
        res.status(200).json({success: true, message: address});
    } catch (error) {
        next(error);
    }
};