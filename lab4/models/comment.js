const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    photoId: { type: mongoose.Types.ObjectId, ref: 'User' },
    commentText: { type: String, required: true },
    commentDate: { type: String, default: Date.now, required: true }
});

const CommentModel = mongoose.model('Comment', CommentSchema);
 
module.exports = CommentModel;