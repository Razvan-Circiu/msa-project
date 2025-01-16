const Post = require('../models/Post.js');

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPost = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        comments: [],
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        post.comments.push({ text: req.body.text, sender: req.body.sender });
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};