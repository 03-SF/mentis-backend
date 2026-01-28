const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true
  },
  options: [{
    text: {
      type: String,
      required: true,
      trim: true
    },
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  }],
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['A', 'C', 'S', 'P'],
      message: 'Category must be A (Analytical), C (Creative), S (Social), or P (Practical)'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Validation: Ensure at least 2 options per question
questionSchema.pre('save', function(next) {
  if (this.options.length < 2) {
    next(new Error('Question must have at least 2 options'));
  }
  next();
});

module.exports = mongoose.model('Question', questionSchema);
