import express from "express";
import { addRestaurant, getAllNearByRestaurants, getRandomRestaurants, getRestaurantById } from "../controllers/restaurantController.js";
import { verifyTokenAndAuthorization } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyTokenAndAuthorization, addRestaurant);

router.get("/:code", getRandomRestaurants);

router.get("/all/:code", getAllNearByRestaurants);

router.get("/byId/:id", getRestaurantById);

export default router;