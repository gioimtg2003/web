import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    albums: [{
        type: mongoose.Schema.Types.ObjectId, ref: "album"
    }],
    biography: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'suspend'],
        default: 'active'
    }
}, { timestamps: true });

const Artist = mongoose.model('artist', artistSchema);

export default Artist;