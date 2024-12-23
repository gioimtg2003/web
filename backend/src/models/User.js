// In models/User.js
import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// Pre-save hook for password hashing
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to check password validity
UserSchema.methods.isValidPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const userModel = mongoose.models.User || mongoose.model('User', UserSchema)

export default userModel