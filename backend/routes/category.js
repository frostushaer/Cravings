import express from "express";
import { createCategory, getAllCategories, getRandomCategories } from "../controllers/categoryController.js";
import { verifyAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/createCategory", verifyAdmin, createCategory);

router.get("/getAllCategories", getAllCategories);

router.get("/getRandomCategories", getRandomCategories);

export default router;