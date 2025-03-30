import mongoose from "mongoose";


const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});


const adminModel = mongoose.models.admin || mongoose.model("admin", AdminSchema);

export default adminModel;
