import express from "express";
const router = express.Router();

// Import controller functions

import { createUser, updateUser, deleteUser, login, meProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/register", createUser);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);
router.post("/login", login);
router.get("/me", protect, meProfile);

export default router;
