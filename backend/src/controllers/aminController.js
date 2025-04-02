import adminModel from "../models/adminModel.js";
import { generateToken } from "../utils/jwtUtils.js";
export const meProfile = async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
};


export const login = async (req, res) => {
    const { username, password: inputPassword } = req.body;

    if (!username || !inputPassword) {
        return res.status(400).json({ error: true, message: 'Email and password are required' });
    }

    try {
        const user = await adminModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid user or password' });
        }

        if (inputPassword !== user.password) {
            return res.status(401).json({ success: false, message: 'Invalid usser or password' });
        }

        const { password, ...userWithoutPassword } = user.toObject();
        return res.status(200).json({ success: true, message: 'Login successful', token: generateToken(userWithoutPassword) });
    } catch (err) {
        console.log('Error during login', err.message);
        return res.status(500).json({ error: true, message: 'Server error', details: err.message });
    }
};