import { v2 as cloudinary } from 'cloudinary'
import songModel from '../models/songModel.js';


const addSong = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const artist = req.body.artist;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`

        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration,
            artist,
        }

        const song = songModel(songData);
        await song.save();

        res.json({ success: true, message: "Song added" })

    } catch (error) {
        res.json({ success: false });
    }
}

const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({}).populate('artist');
        res.json({ success: true, songs: allSongs });

    } catch (error) {
        res.json({ success: false });
    }
}

const removeSong = async (req, res) => {
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Song removed" });

    } catch (error) {
        res.json({ success: false });
    }
}

const updateSong = async (req, res) => {
    try {
        const { id, name, album, artist } = req.body;
        await songModel.findByIdAndUpdate(id, { name, album, artist });
        res.json({ success: true, message: 'Song updated successfully' });
    } catch (error) {
        res.json({ success: false, message: 'Failed to update song' });
    }
};

const searchSongs = async (req, res) => {
    try {
        const search = req.query.search;
        const songs = await songModel.find({ name: { $regex: search, $options: 'i' } });
        res.json({ success: true, songs });
    } catch (error) {
        res.json({ success: false });
    }
}



export { addSong, listSong, removeSong, updateSong, searchSongs }