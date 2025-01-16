const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
});


module.exports = mongoose.model('Animal', animalSchema);