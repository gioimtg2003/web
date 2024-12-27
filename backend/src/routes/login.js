// importat bahen si import moduename from 'modulename' e jo si require('modulename');
import express from "express";
import cors from "cors";
import { login } from "../controllers/login.js";

const router = express.Router();

// export default router = express.Router();

// router.use(cors());

router.post("/login", login);

export default router;
