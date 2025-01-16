const User = require('../models/User.js');

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createUser = async (req, res) => {

console.log(req.query);

    const user = new User({
        name: req.query.name,
        email: req.query.email,
        bio: req.query.bio,
        notifications: []
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}; 

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (req.body.name) user.name = req.body.name;
        if (req.body.email) user.email = req.body.email;
        if (req.body.bio) user.bio = req.body.bio;
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};