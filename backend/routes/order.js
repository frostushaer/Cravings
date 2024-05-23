import express from "express";
import { verifyTokenAndAuthorization } from "../middleware/verifyToken.js";
import { getOrders, placeOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", verifyTokenAndAuthorization, placeOrder);
router.get("/", verifyTokenAndAuthorization, getOrders);

export default router;