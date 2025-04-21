const mongoose = require('mongoose');

const VocabularySchema = new mongoose.Schema({
  kanji: {
    type: String,
    required: false,
    trim: true
  },
  kana: {
    type: String,
    required: true,
    trim: true
  },
  meaning: {
    type: String,
    required: true,
    trim: true
  },
  examples: [{
    japanese: {
      type: String,
      required: true
    },
    english: {
      type: String,
      required: true
    }
  }],
  tags: {
    type: [String],
    default: []
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vocabulary', VocabularySchema); 