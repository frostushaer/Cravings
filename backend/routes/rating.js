import express from "express";
import { addRating, checkUserRating } from "../controllers/ratingController.js";
import { verifyTokenAndAuthorization } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyTokenAndAuthorization, addRating);

router.get("/", verifyTokenAndAuthorization, checkUserRating );

export default router;