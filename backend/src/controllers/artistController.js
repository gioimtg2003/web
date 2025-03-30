import SongModel from "../models/songModel.js";
import ArtistModel from "../models/artistModel.js";


import { v2 as cloudinary } from 'cloudinary'

export const addArtist = async (req, res) => {
    try {
        const { name, email, biography, verified, genre } = req.body;
        const imageFile = req.files.image[0];
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

        const artistData = {
            name,
            email,
            biography,
            genre,
            status: verified ? 'active' : 'pending',
            image: imageUpload.secure_url
        }

        const created = await ArtistModel.create(artistData);
        const saved = await created.save();
        res.status(201).json({ saved });
    } catch (error) {
        res.status(400).json({ message: "Error adding artist", error: error.message });
    }
}

export const getArtists = async (req, res) => {
    try {
        const artists = await ArtistModel.find();

        const data = await Promise.all((artists ?? []).map(async (artist) => {
            const trackNumber = await SongModel.find({ artist: artist._id }).countDocuments();
            return {
                ...artist.toObject(),
                tracks: trackNumber,
                followers: Number((Math.random() * 1000).toFixed(0))
            }
        }));
        res.status(200).json({ data });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error fetching artists", error: error.message });
    }
}

export const deleteArtist = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ArtistModel.findByIdAndDelete(id);
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(400).json({ message: "Error deleting artist", error: error.message });
    }
}

export const updateStatusArtist = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await ArtistModel.findByIdAndUpdate
            (id, { status }, { new: true });
        res.status(200).json({ updated });
    }
    catch (error) {
        res.status(400).json({ message: "Error updating artist status", error: error.message });
    }
}
