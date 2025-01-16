const Animal = require('../models/Animal.js');

exports.getAnimals = async (req, res) => {
    try {
        const animals = await Animal.find();
        res.json(animals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createAnimal = async (req, res) => {
    const animal = new Animal({
        name: req.query.name,
        species: req.query.species,
        gender: req.query.gender,
        age: req.query.age,
        location: req.query.location,
        description: req.query.description,
        images: req.query.images,
    });

    try {
        const newAnimal = await animal.save();
        res.status(201).json(newAnimal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};