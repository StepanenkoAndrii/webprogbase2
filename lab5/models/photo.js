const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    photoName: { type: String, required: true },
    location: { type: String, default: "Unknown" },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    photoDate: { type: String, required: true},
    photoUrl: { type: String, required: true }
});

const PhotoModel = mongoose.model('Photo', PhotoSchema);
 
module.exports = PhotoModel;