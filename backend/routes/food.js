import express from "express";
import { addFood, getFoodByCategoryAndCode, getFoodById, getFoodByRestaurant, getRandomFood, searchFood } from "../controllers/foodController";

const router = express.Router();

router.post("/", addFood);

router.get("/:id", getFoodById);
router.get("/random/:code", getRandomFood);
router.get("/searcch/:search", searchFood);

router.get("/:category/:code", getFoodByCategoryAndCode);

router.get("/recommendation:code", getRandomFood);

router.get("/restaurant-foods/:id", getFoodByRestaurant);

export default router;