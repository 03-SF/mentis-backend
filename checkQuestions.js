require('dotenv').config();
const mongoose = require('mongoose');
const { Question } = require('./src/models');

async function checkQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const questions = await Question.find({ isActive: true });
    console.log(`Found ${questions.length} active questions`);
    
    if (questions.length > 0) {
      console.log('\nFirst question:');
      console.log(questions[0]);
    } else {
      console.log('\n❌ No questions found in database!');
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkQuestions();
