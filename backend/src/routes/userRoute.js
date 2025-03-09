import express from "express";
const router = express.Router();

// Import controller functions

import { createUser, updateUser, deleteUser, login, meProfile, getUsers, addFavoriteSong, getFavoriteSongs } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/register", createUser);
router.get("/", getUsers);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);
router.post("/login", login);
router.get("/me", protect, meProfile);
router.post("/playlist", protect, addFavoriteSong);
router.get("/playlist", protect, getFavoriteSongs);


export default router;
