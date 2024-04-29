import { Restaurant } from "../models/restaurant.js";

export const addRestaurant = async (req, res, next) => {
    try {
        const { title, time, imageUrl, owner, code, logoUrl, coords } = req.body;

        if(!title || !time || !imageUrl || !owner || !code || !logoUrl || !coords || !coords.latitude || !coords.longitude || !coords.title || !coords.address) {
            res.status(400).json({
                success: false,
                message: "Field Missing",
            });
        }

        const newRestaurant = new Restaurant(req.body);

        await newRestaurant.save();

        res.status(201).json({
            success: true,
            message: "Restaurant created Successfully",
        });

    } catch (error) {
        next(error);
    }
};

export const getRestaurantById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const restaurant = await Restaurant.findById(id);

        res.status(200).json({
            success: true,
            message: restaurant,
        });

    } catch (error) {
        next(error);
    }
};

export const getRandomRestaurants = async (req, res, next) => {
    try {
        const code = req.params.code;
        let randomRestaurants = [];

        if (code) {
            randomRestaurants = await Restaurant.aggregate([
                {$match: {code: code, isAvailable: true}},
                {$sample: {size: 5}},
                {$project: {__v: 0}}
            ]);
        }

        if(randomRestaurants.length === 0) {
            randomRestaurants = await Restaurant.aggregate([
                {$match: {code: code, isAvailable: true}},
                {$sample: {size: 5}},
                {$project: {__v: 0}}
            ]);
        }

        res.status(200).json({
            success: true,
            message: randomRestaurants,
        });

    } catch (error) {
        next(error);
    }
};

export const getAllNearByRestaurants = async (req, res, next) => {
    try {
        const code = req.params.code;
        let allNearByRestaurants = [];

        if (code) {
            allNearByRestaurants = await Restaurant.aggregate([
                {$match: {code: code, isAvailable: true}},
                {$project: {__v: 0}}
            ]);
        }

        if(allNearByRestaurants.length === 0) {
            randomRestaurants = await Restaurant.aggregate([
                {$match: {code: code, isAvailable: true}},
                {$project: {__v: 0}}
            ]);
        }

        res.status(200).json({
            success: true,
            message: allNearByRestaurants,
        });

    } catch (error) {
        next(error);
    }
};