import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    ratingType: {
        type: String,
        required: true,
        enum: ['Restaurant', 'Driver', 'Food'],
    },
    product: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
});

export const Rating = mongoose.model("Rating", RatingSchema);