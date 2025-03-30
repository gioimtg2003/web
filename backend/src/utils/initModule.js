import adminModel from "../models/adminModel.js";

export const initModuleAdmin = async () => {
    const admin = await adminModel.findOne({ username: "doanmusic" });
    if (!admin) {
        console.log("Creating admin user");
        await adminModel.create({
            username: "doanmusic",
            password: "admin",
            role: "admin",
        });
    }
};
