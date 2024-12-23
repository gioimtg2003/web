import express from "express";
const router = express.Router();

// Import controller functions

import { createUser, updateUser, deleteUser, login} from "../controllers/userController.js";

router.post("/register", createUser);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);
router.post("/login",login);

export default router;
