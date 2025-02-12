const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    notifications: [{ message: String, read: Boolean }],
});


module.exports = mongoose.model('User', userSchema);