import { v2 as cloudinary } from 'cloudinary'
import albumModel from '../models/albumModel.js';

const addAlbum = async (req, res) => {

    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColour = req.body.bgColour;
        const imageFile = req.file;
        const artist = req.body.artist;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

        const albumData = {
            name,
            desc,
            bgColour,
            image: imageUpload.secure_url,
            artist

        }
        const album = albumModel(albumData);
        await album.save();

        res.json({ success: true, message: "album added" })



    } catch (error) {

        res.json({ success: false, error: error.message });

    }

}



const listAlbum = async (req, res) => {

    try {
        const allAlbums = await albumModel.find({});
        res.json({ success: true, albums: allAlbums });

    } catch (error) {

        res.json({ success: false, error: error.message });

    }

}

const removeAlbum = async (req, res) => {

    try {

        await albumModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Album removed" })

    } catch (error) {

        res.json({ success: false, error: error.message });

    }

}

export { addAlbum, listAlbum, removeAlbum }