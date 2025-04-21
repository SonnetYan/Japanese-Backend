const express = require('express');
const router = express.Router();
const userProgressController = require('../controllers/userProgressController');

// GET user progress for a specific user
router.get('/user/:userId', userProgressController.getUserProgress);

// POST update progress for a vocabulary word
router.post('/update', userProgressController.updateProgress);

// GET words due for review
router.get('/review/:userId', userProgressController.getReviewWords);

module.exports = router; 