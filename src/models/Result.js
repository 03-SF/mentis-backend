const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  scores: {
    A: {
      type: Number,
      default: 0,
      min: 0
    },
    C: {
      type: Number,
      default: 0,
      min: 0
    },
    S: {
      type: Number,
      default: 0,
      min: 0
    },
    P: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  normalizedScores: {
    A: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    C: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    S: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    P: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  }
}, {
  timestamps: true
});

// Index for quick user lookup
resultSchema.index({ userId: 1 });

module.exports = mongoose.model('Result', resultSchema);
