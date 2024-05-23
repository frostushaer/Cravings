import express from "express";
import { verifyTokenAndAuthorization } from "../middleware/verifyToken.js";
import { addAddress, deleteAddress, getAddresses, getDefaultAddress, setDefaultAddress } from "../controllers/addressController.js";

const router = express.Router();

router.get("/all", verifyTokenAndAuthorization, getAddresses);

router.post("/", verifyTokenAndAuthorization, addAddress);
router.get("/default", verifyTokenAndAuthorization, getDefaultAddress);
router.delete("/:id", verifyTokenAndAuthorization, deleteAddress);
router.put("/default/:id", verifyTokenAndAuthorization, setDefaultAddress);

export default router;