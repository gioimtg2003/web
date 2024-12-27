import crypto from "crypto";

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString("hex");

export { secretKey };
