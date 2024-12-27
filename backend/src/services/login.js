import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../utils/jwtUtils.js";

export const loginAndReturnToken = async (email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error("user not found");
    }
    const isPasswordValid = bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      throw new Error("incorrect password");
    }
    const token = generateToken(existingUser);
    return token;
  } catch (error) {
    throw new Error("Invalide credentials");
  }
};
