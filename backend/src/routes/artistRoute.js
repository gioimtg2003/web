import express from "express";
import upload from "../middleware/multer.js";
import { addArtist, deleteArtist, getArtists, updateStatusArtist } from "../controllers/artistController.js";

const artistRouter = express.Router();

artistRouter.post(
    "/",
    upload.fields([
        { name: "image", maxCount: 1 },
    ]),
    addArtist
);

artistRouter.get("/", getArtists);
artistRouter.delete("/:id", deleteArtist);
artistRouter.put("/status/:id", updateStatusArtist)

export default artistRouter;
