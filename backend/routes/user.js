import express from "express";
import { deleteUser, getUser, verifyAccount, verifyPhone } from "../controllers/userController.js";
import { verifyTokenAndAuthorization } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyTokenAndAuthorization, getUser);

router.delete("/", verifyTokenAndAuthorization, deleteUser);
router.get("/verify/:otp", verifyTokenAndAuthorization, verifyAccount);
router.get("/verifyPhone/:phone",verifyTokenAndAuthorization, verifyPhone);

export default router;