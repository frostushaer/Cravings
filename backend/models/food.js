import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    foodTags: {
        type: Array,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    foodType: {
        type: Array,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 3,
    },
    ratingCount: {
        type: String,
        default: "342",
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    additive: {
        type: Array,
        default: [],
    },
    imageUrl: {
        type: Array,
        required: true,
    },
});

export const Food = mongoose.model("Food", FoodSchema);