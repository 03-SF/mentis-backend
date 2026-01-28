require('dotenv').config();
const mongoose = require('mongoose');

async function clearAssessment() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear all assessment-related data
    await mongoose.connection.db.collection('responses').deleteMany({});
    await mongoose.connection.db.collection('results').deleteMany({});
    await mongoose.connection.db.collection('recommendations').deleteMany({});

    console.log('✓ Cleared all responses');
    console.log('✓ Cleared all results');
    console.log('✓ Cleared all recommendations');
    console.log('\nYou can now take the assessment again!');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

clearAssessment();
