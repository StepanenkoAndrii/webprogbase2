const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    photoName: { type: String, required: true },
    location: { type: String },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    photoDate: { type: String, default: Date.now },
    photoUrl: { type: String }
});

const PhotoModel = mongoose.model('Photo', PhotoSchema);
 
module.exports = PhotoModel;