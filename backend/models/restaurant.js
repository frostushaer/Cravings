import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    foods: {
        type: Array,
        default: [],
    },
    pickup: {
        type: Boolean,
        default: true
    },
    delivery: {
        type: Boolean,
        default: true
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    logoUrl: {
        type: String,
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
        default: "555",
    },
    verification: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Verified", "Rejected"]
    },
    verificationMessage: {
        type: String,
        default: "Your Restaurant is under review. We will noify you once verified.",
    },
    coords: {
        id: {
            type: String,
        },
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        latitudeDelta: {
            type: Number,
            default: 0.022
        },
        longitudeDelta: {
            type: Number,
            default: 0.022
        },
        address: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },

});

export const Restaurant = mongoose.model("Restaurant", RestaurantSchema);