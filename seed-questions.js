require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./src/models/Question');

const sampleQuestions = [
  // Analytical Questions (A)
  {
    questionText: 'I enjoy solving complex mathematical problems',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'A',
    isActive: true
  },
  {
    questionText: 'I prefer analyzing data and finding patterns',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'A',
    isActive: true
  },
  {
    questionText: 'I like working with numbers and statistics',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'A',
    isActive: true
  },
  {
    questionText: 'I enjoy logical reasoning and critical thinking',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'A',
    isActive: true
  },
  {
    questionText: 'I like troubleshooting technical problems',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'A',
    isActive: true
  },

  // Creative Questions (C)
  {
    questionText: 'I enjoy creating art, designs, or visual content',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'C',
    isActive: true
  },
  {
    questionText: 'I like thinking of new and innovative ideas',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'C',
    isActive: true
  },
  {
    questionText: 'I prefer working on projects that allow creative expression',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'C',
    isActive: true
  },
  {
    questionText: 'I enjoy writing stories or creating content',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'C',
    isActive: true
  },
  {
    questionText: 'I like experimenting with new approaches to problems',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'C',
    isActive: true
  },

  // Social Questions (S)
  {
    questionText: 'I enjoy helping and supporting others',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'S',
    isActive: true
  },
  {
    questionText: 'I like working in teams and collaborating',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'S',
    isActive: true
  },
  {
    questionText: 'I prefer jobs that involve interacting with people',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'S',
    isActive: true
  },
  {
    questionText: 'I enjoy teaching or mentoring others',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'S',
    isActive: true
  },
  {
    questionText: 'I am good at understanding others\' emotions',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'S',
    isActive: true
  },

  // Practical Questions (P)
  {
    questionText: 'I enjoy hands-on work and building things',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'P',
    isActive: true
  },
  {
    questionText: 'I like working with tools and machinery',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'P',
    isActive: true
  },
  {
    questionText: 'I prefer learning by doing rather than reading',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'P',
    isActive: true
  },
  {
    questionText: 'I enjoy fixing or repairing things',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'P',
    isActive: true
  },
  {
    questionText: 'I like following step-by-step procedures',
    options: [
      { text: 'Strongly Agree', score: 5 },
      { text: 'Agree', score: 4 },
      { text: 'Neutral', score: 3 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 1 }
    ],
    category: 'P',
    isActive: true
  }
];

async function seedQuestions() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    // Insert sample questions
    const result = await Question.insertMany(sampleQuestions);
    console.log(`Inserted ${result.length} questions`);

    // Display category distribution
    const distribution = {
      A: result.filter(q => q.category === 'A').length,
      C: result.filter(q => q.category === 'C').length,
      S: result.filter(q => q.category === 'S').length,
      P: result.filter(q => q.category === 'P').length
    };
    console.log('\nCategory Distribution:');
    console.log(`Analytical (A): ${distribution.A}`);
    console.log(`Creative (C): ${distribution.C}`);
    console.log(`Social (S): ${distribution.S}`);
    console.log(`Practical (P): ${distribution.P}`);

    console.log('\nQuestions seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding questions:', error);
    process.exit(1);
  }
}

seedQuestions();
