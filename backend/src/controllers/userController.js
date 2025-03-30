import userModel from "../models/User.js";
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/jwtUtils.js";
//const {generateToken} = require ('../utils/jwtUtils.js');





// Get all users

export const meProfile = async (req, res) => {
  const user = req.user;
  res.status(200).json(user);
};
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, { name: 1, email: 1, _id: 1 }).sort({ createdAt: -1 });
    console.log("Users fetched:", users);
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Get a single user
export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  console.log('Request body received', req.body);

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: true, message: 'All fields are required' });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: true, message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('Hashed password', hashedPassword);

    const newUser = new userModel({
      name,
      email,
      password,
    });

    const savedUser = await newUser.save();
    return res.status(201).json({
      success: true,
      message: 'Signup successful',
      user: { id: savedUser._id, name: savedUser.name, email: savedUser.email },
    });
  } catch (err) {
    console.error('Error during signup', err.message);
    return res.status(500).json({ error: true, message: 'Server error', details: err.message });
  }
};

// Login a user
export const login = async (req, res) => {
  const { email, password: inputPassword } = req.body;

  if (!email || !inputPassword) {
    return res.status(400).json({ error: true, message: 'Email and password are required' });
  }

  try {
    const user = await userModel.findOne({ email });
    console.log('Database user data:', user);

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordValid = await user.isValidPassword(inputPassword);
    console.log('Password comparison result:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const { password, ...userWithoutPassword } = user.toObject();
    return res.status(200).json({ success: true, message: 'Login successful', token: generateToken(userWithoutPassword) });
  } catch (err) {
    console.log('Error during login', err.message);
    return res.status(500).json({ error: true, message: 'Server error', details: err.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};


export const addFavoriteSong = async (req, res) => {
  const { id } = req.user;
  const { songId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    const user = await userModel.findById(id);
    if
      (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.favoriteSongs.includes(songId)) {
      return res.status(400).json({ error: "Song already in favorites" });
    }
    user.favoriteSongs.push(songId);
    await user.save();
    res.status(200).json({ message: "Song added to favorites" });
  }
  catch (error) {
    res.status(500).json({ message: "Error adding song to favorites", error: error.message });
  }
}

export const getFavoriteSongs = async (req, res) => {
  const { id } = req.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    const user = await userModel.findById(id).populate("favoriteSongs");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.favoriteSongs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorite songs", error: error.message });
  }
}

export const addHistory = async (req, res) => {
  const { id } = req.user;
  const { songId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    const user = await userModel.findById(id);
    if
      (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.history.includes(songId)) {
      user.history = user.history.filter(item => item.toString() !== songId);
    }
    user.history.push(songId);
    await user.save();
    res.status(200).json({ message: "Song added to history" });
  } catch (error) {
    res.status(500).json({ message: "Error adding song to history", error: error.message });
  }
}

export const getHistory = async (req, res) => {
  const { id } = req.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    const user = await userModel.findById(id).populate("history");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching history", error: error.message });
  }
}


