const express = require('express');
var animalController = require('../controllers/animalController.js');

const router = express.Router();

router.get('/', animalController.getAnimals);
router.post('/', animalController.createAnimal);

module.exports = router;