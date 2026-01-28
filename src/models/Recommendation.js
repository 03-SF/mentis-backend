const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  topCategories: [{
    type: String,
    enum: ['A', 'C', 'S', 'P']
  }],
  recommendedCareers: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index for quick user lookup
recommendationSchema.index({ userId: 1 });

module.exports = mongoose.model('Recommendation', recommendationSchema);
