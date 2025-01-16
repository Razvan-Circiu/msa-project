const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.post('/:id', userController.createUser);

module.exports = router;