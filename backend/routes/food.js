import express from "express";
import { addFood, getFoodByCategoryAndCode, getFoodById, getFoodByRestaurant, getRandomFood, searchFood } from "../controllers/foodController.js";
import { verifyVendor } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyVendor, addFood);

router.get("/recommendation/:code", getRandomFood);

router.get("/:id", getFoodById);

router.get("/search/:search", searchFood);

router.get("/:category/:code", getFoodByCategoryAndCode);

router.get("/restaurant-foods/:id", getFoodByRestaurant);

export default router;