const mongoose = require('mongoose');

const UserProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  vocabularyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vocabulary',
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'learning', 'reviewing', 'mastered'],
    default: 'new'
  },
  correctCount: {
    type: Number,
    default: 0
  },
  incorrectCount: {
    type: Number,
    default: 0
  },
  lastReviewed: {
    type: Date,
    default: null
  },
  nextReviewDate: {
    type: Date,
    default: null
  }
});

// Create a compound index to ensure a user can only have one progress entry per vocabulary word
UserProgressSchema.index({ userId: 1, vocabularyId: 1 }, { unique: true });

module.exports = mongoose.model('UserProgress', UserProgressSchema); 