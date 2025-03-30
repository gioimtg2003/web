import jwt from "jsonwebtoken";

export function generateToken(user) {
  const payload = {
    id: user._id,
    email: user?.email,
    name: user?.name,
    username: user?.username,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });
}
