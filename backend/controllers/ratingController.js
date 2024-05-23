import { Rating } from "../models/rating.js";
import { Restaurant } from "../models/restaurant.js";
import { Food } from "../models/food.js";

export const addRating = async (req, res, next) => {
    try {
        const newRating = new Rating({
            userId: req.user.id,
            ratingType: req.body.rating,
            product: req.body.product,
            rating: req.user.rating
        });

        await newRating.save();

        if(req.body.ratingType === "Restaurant") {
            const restaurants = await Rating.aggregate([
                {$match: {ratingType: req.body.ratingType, product: req.body.product }},
                {$group: {_id: '$product'}, averageRating: { $avg: '$rating'}}
            ]);

            if(restaurants.length > 0) {
                const averageRating = restaurants[0].averageRating;
                await Restaurant.findByIdAndUpdate(req.body.product, {rating: averageRating}, {new: true});
            }
        } else if (req.body.ratingType === "Food") {
            const foods = await Rating.aggregate([
                {$match: {ratingType: req.body.ratingType, product: req.body.product }},
                {$group: {_id: '$product'}, averageRating: { $avg: '$rating'}}
            ]);

            if(foods.length > 0) {
                const averageRating = foods[0].averageRating;
                await Food.findByIdAndUpdate(req.body.product, {rating: averageRating}, {new: true});
            }
        }
        // simmilarly we can do for driver

        res.status(200).json({
            success: true,
            message: "Rating Updated Succesfully",
        });

    } catch (error) {
        next(error);
    }
            
};

export const checkUserRating = async (req, res, next) => {
    try {

        const ratingType = req.query.ratingType;
        const product = req.query.product;

        const existingRating = await Rating.findOne({
            userId: req.user.id,
            product: product,
            ratingType: ratingType
        });

        if(existingRating) {
            res.status(200).json({
                success: true,
                message: "Already rated !",
            });
        } else {
            res.status(200).json({
                success: false,
                message: "Not rated yet",
            });
        }

    } catch (error) {
        next(error);
    }
};
