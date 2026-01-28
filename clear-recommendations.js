// Utility script to clear all cached recommendations
// Run this to force regeneration of recommendations with new algorithm

require('dotenv').config();
const mongoose = require('mongoose');
const Recommendation = require('./src/models/Recommendation');

async function clearRecommendations() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✔ Connected to MongoDB');

    // Delete all recommendations
    const result = await Recommendation.deleteMany({});
    console.log(`✔ Deleted ${result.deletedCount} cached recommendations`);
    
    console.log('\n✨ All users will get fresh recommendations on next login!');
    console.log('   New algorithm features:');
    console.log('   - Dominance weighting (top categories boosted 40%)');
    console.log('   - Minimum fit score cutoff (only ~25-30 careers shown)');
    console.log('   - Relative confidence (50-90%, not fake 95%)');
    console.log('   - Confidence labels (Strong/Moderate/Exploratory)');
    console.log('   - Detailed explanations for each career');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

clearRecommendations();
