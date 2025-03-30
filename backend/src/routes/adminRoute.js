import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { login, meProfile } from "../controllers/aminController.js";
const router = express.Router();

router.get("/me", protect, meProfile);
router.post("/login", login);

export default router;