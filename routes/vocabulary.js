const express = require('express');
const router = express.Router();
const vocabularyController = require('../controllers/vocabularyController');

// GET all vocabulary
router.get('/', vocabularyController.getVocabulary);

// GET specific vocabulary by ID
router.get('/:id', vocabularyController.getVocabularyById);

// POST create new vocabulary
router.post('/', vocabularyController.createVocabulary);

// PUT update vocabulary
router.put('/:id', vocabularyController.updateVocabulary);

// DELETE vocabulary
router.delete('/:id', vocabularyController.deleteVocabulary);

module.exports = router; 