import express from "express";
import { addProductToCart, decrementProductQuantity, getCart, getCartCount, removeCartItem } from "../controllers/cartController.js";
import { verifyTokenAndAuthorization } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyTokenAndAuthorization, addProductToCart);
router.get("/decrement/:id", verifyTokenAndAuthorization, decrementProductQuantity);
router.delete("/:id", verifyTokenAndAuthorization, removeCartItem);
router.get("/", verifyTokenAndAuthorization, getCart);
router.get("/count", verifyTokenAndAuthorization, getCartCount);

export default router;