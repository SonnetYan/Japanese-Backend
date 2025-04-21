const Vocabulary = require('../models/Vocabulary');

// Get all vocabulary words
exports.getVocabulary = async (req, res) => {
  try {
    const vocabulary = await Vocabulary.find();
    res.status(200).json(vocabulary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single vocabulary word
exports.getVocabularyById = async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findById(req.params.id);
    if (!vocabulary) {
      return res.status(404).json({ message: 'Vocabulary not found' });
    }
    res.status(200).json(vocabulary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new vocabulary word
exports.createVocabulary = async (req, res) => {
  const vocabulary = new Vocabulary(req.body);
  
  try {
    const newVocabulary = await vocabulary.save();
    res.status(201).json(newVocabulary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a vocabulary word
exports.updateVocabulary = async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findById(req.params.id);
    if (!vocabulary) {
      return res.status(404).json({ message: 'Vocabulary not found' });
    }
    
    Object.keys(req.body).forEach(key => {
      vocabulary[key] = req.body[key];
    });
    
    const updatedVocabulary = await vocabulary.save();
    res.status(200).json(updatedVocabulary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a vocabulary word
exports.deleteVocabulary = async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findById(req.params.id);
    if (!vocabulary) {
      return res.status(404).json({ message: 'Vocabulary not found' });
    }
    
    await Vocabulary.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Vocabulary deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 