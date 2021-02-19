const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    login: { type: String, required: true },
    fullname: { type: String, required: true },
    role: { type: Number, required: true },
    registeredAt: { type: String, default: Date.now },
    avaUrl: { type: String },
    isEnabled: { type: Boolean },
    bio: { type: String },
});

const UserModel = mongoose.model('User', UserSchema);
 
module.exports = UserModel;