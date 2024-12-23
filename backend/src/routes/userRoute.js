import express from "express";
const router = express.Router();

// Import controller functions

import { createUser, updateUser, deleteUser } from "../controllers/userController.js";

router.post("/register", createUser);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);

export default router;
