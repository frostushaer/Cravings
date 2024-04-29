import express from "express";
import { createCategory, getAllCategories, getRandomCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/createCategory", createCategory);

router.get("/getAllCategories", getAllCategories);

router.get("/getRandomCategories", getRandomCategories);

export default router;