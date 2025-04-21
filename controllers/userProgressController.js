const UserProgress = require('../models/UserProgress');

// Get user progress for a specific user
exports.getUserProgress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const progress = await UserProgress.find({ userId }).populate('vocabularyId');
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update or create user progress for a vocabulary word
exports.updateProgress = async (req, res) => {
  try {
    const { userId, vocabularyId, status, isCorrect } = req.body;
    
    // Find existing progress or create new one
    let progress = await UserProgress.findOne({ userId, vocabularyId });
    
    if (!progress) {
      progress = new UserProgress({
        userId,
        vocabularyId,
        status: status || 'new',
        lastReviewed: new Date(),
        nextReviewDate: calculateNextReview('new')
      });
    } else {
      // Update progress based on quiz results
      if (isCorrect !== undefined) {
        if (isCorrect) {
          progress.correctCount += 1;
        } else {
          progress.incorrectCount += 1;
        }
      }
      
      if (status) {
        progress.status = status;
      }
      
      progress.lastReviewed = new Date();
      progress.nextReviewDate = calculateNextReview(progress.status);
    }
    
    const updatedProgress = await progress.save();
    res.status(200).json(updatedProgress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get words due for review
exports.getReviewWords = async (req, res) => {
  try {
    const userId = req.params.userId;
    const now = new Date();
    
    const dueWords = await UserProgress.find({
      userId,
      nextReviewDate: { $lte: now }
    }).populate('vocabularyId');
    
    res.status(200).json(dueWords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to calculate next review date based on SRS
function calculateNextReview(status) {
  const now = new Date();
  let intervalDays = 1; // Default
  
  switch (status) {
    case 'new':
      intervalDays = 1;
      break;
    case 'learning':
      intervalDays = 3;
      break;
    case 'reviewing':
      intervalDays = 7;
      break;
    case 'mastered':
      intervalDays = 30;
      break;
    default:
      intervalDays = 1;
  }
  
  const nextDate = new Date(now);
  nextDate.setDate(nextDate.getDate() + intervalDays);
  
  return nextDate;
} 