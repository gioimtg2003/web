import { loginAndReturnToken } from "../services/login.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginAndReturnToken(email, password);
    res.json({ token: token });
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
