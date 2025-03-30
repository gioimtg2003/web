import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/albumRoute.js";
import userRoute from "./src/routes/userRoute.js";
import loginRouter from "./src/routes/login.js";
import genreRouter from "./src/routes/genreRoute.js";
import artistRouter from "./src/routes/artistRoute.js";
import adminRouter from "./src/routes/adminRoute.js";
import { initModuleAdmin } from "./src/utils/initModule.js";



//import authRoutes from "./src/routes/authRoutes.js"; //prejvideos

async function initApplication() {
    const app = express();
    const port = process.env.PORT || 4000;
    await connectDB();
    await connectCloudinary();
    await initModuleAdmin();

    //middlewares
    app.use(express.json());
    app.use(cors());


    app.use("/api/song", songRouter);
    app.use("/api/artist", artistRouter);
    app.use("/api/genre", genreRouter);
    app.use("/api/album", albumRouter);
    app.use("/api/users", userRoute);
    app.use("/auth", loginRouter);
    app.use("/api/admin", adminRouter);

    app.get("/", (req, res) => res.send("API working"));

    app.listen(port, () => console.log(`Server started on ${port}`));
}

initApplication();


