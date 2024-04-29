import express from "express";
import { addRestaurant, getAllNearByRestaurants, getRandomRestaurants, getRestaurantById } from "../controllers/restaurantController.js";

const router = express.Router();

router.post("/", addRestaurant);

router.get("/:code", getRandomRestaurants);

router.get("/all/:code", getAllNearByRestaurants);

router.get("/byId/:id", getRestaurantById);

export default router;