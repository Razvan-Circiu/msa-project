const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments: [{ text: String, sender: String }],
});

module.exports = mongoose.model('Post', postSchema);