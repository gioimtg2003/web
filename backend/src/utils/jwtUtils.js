import jwt from "jsonwebtoken";
import { secretKey } from "../config/jwtConfig.js";

export function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}
