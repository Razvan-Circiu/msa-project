const express = require('express');
const postController = require('../controllers/postController.js');

const router = express.Router();

router.get('/', postController.getPosts);
router.post('/', postController.createPost);
router.post('/:id/comments', postController.addComment);

module.exports = router;