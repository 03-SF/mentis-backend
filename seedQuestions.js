require('dotenv').config();
const mongoose = require('mongoose');
const { Question } = require('./src/models');

// Categories: A=Analytical, C=Creative, S=Social, P=Practical
const questions = [
  // Analytical Questions (5)
  {
    questionText: "When solving a complex problem, you prefer to:",
    category: "A",
    options: [
      { text: "Analyze data and use logical reasoning", score: 5 },
      { text: "Brainstorm creative solutions", score: 2 },
      { text: "Ask for input from others", score: 1 }
    ],
    isActive: true
  },
  {
    questionText: "You enjoy working with:",
    category: "A",
    options: [
      { text: "Numbers, data, and statistics", score: 5 },
      { text: "Colors, designs, and visuals", score: 1 },
      { text: "People and conversations", score: 2 }
    ],
    isActive: true
  },
  {
    questionText: "Your ideal work involves:",
    category: "A",
    options: [
      { text: "Research, analysis, and problem-solving", score: 5 },
      { text: "Creating and designing new things", score: 2 },
      { text: "Teaching or helping others", score: 1 }
    ],
    isActive: true
  },
  {
    questionText: "When making decisions, you rely most on:",
    category: "A",
    options: [
      { text: "Facts, evidence, and logical thinking", score: 5 },
      { text: "Intuition and creativity", score: 2 },
      { text: "Advice from trusted people", score: 1 }
    ],
    isActive: true
  },
  {
    questionText: "You're naturally drawn to subjects like:",
    category: "A",
    options: [
      { text: "Math, science, and technology", score: 5 },
      { text: "Art, music, and literature", score: 1 },
      { text: "Psychology, sociology, and history", score: 2 }
    ],
    isActive: true
  },
  
  // Creative Questions (5)
  {
    questionText: "In your free time, you enjoy:",
    category: "C",
    options: [
      { text: "Drawing, painting, designing, or creating", score: 5 },
      { text: "Reading, researching, or learning", score: 1 },
      { text: "Socializing and meeting new people", score: 2 }
    ],
    isActive: true
  },
  {
    questionText: "Your ideal project involves:",
    category: "C",
    options: [
      { text: "Expressing yourself through art or design", score: 5 },
      { text: "Analyzing data to find solutions", score: 1 },
      { text: "Collaborating with a team", score: 2 }
    ],
    isActive: true
  },
  {
    questionText: "You feel most inspired when:",
    category: "C",
    options: [
      { text: "Creating something original and unique", score: 5 },
      { text: "Solving a challenging puzzle or problem", score: 1 },
      { text: "Helping someone in need", score: 2 }
    ],
    isActive: true
  },
  {
    questionText: "Your work style is:",
    category: "C",
    options: [
      { text: "Imaginative and innovative", score: 5 },
      { text: "Systematic and methodical", score: 1 },
      { text: "Collaborative and team-oriented", score: 2 }
    ],
    isActive: true
  },
  {
    questionText: "You're most interested in:",
    category: "C",
    options: [
      { text: "Arts, design, music, or entertainment", score: 5 },
      { text: "Science, math, or engineering", score: 1 },
      { text: "Education, healthcare, or social work", score: 2 }
    ],
    isActive: true
  },
  
  // Social Questions (5)
  {
    questionText: "When working on a project, you prefer:",
    category: "S",
    options: [
      { text: "Working with others and building relationships", score: 5 },
      { text: "Working independently at your own pace", score: 1 },
      { text: "A mix of solo and group work", score: 3 }
    ],
    isActive: true
  },
  {
    questionText: "You feel most energized when:",
    category: "S",
    options: [
      { text: "Interacting with people and helping others", score: 5 },
      { text: "Working alone on a challenging task", score: 1 },
      { text: "Creating something new", score: 2 }
    ],
    isActive: true
  },
  {
    questionText: "Your communication skills are best described as:",
    category: "S",
    options: [
      { text: "Strong - I enjoy talking and connecting with people", score: 5 },
      { text: "Moderate - I can communicate when needed", score: 3 },
      { text: "I prefer written or minimal communication", score: 1 }
    ],
    isActive: true
  },
  {
    questionText: "You would enjoy a career that involves:",
    category: "S",
    options: [
      { text: "Teaching, counseling, or working with people daily", score: 5 },
      { text: "Research, analysis, or technical work", score: 1 },
      { text: "Creative projects and artistic expression", score: 2 }
    ],
    isActive: true
  },
  {
    questionText: "In group settings, you typically:",
    category: "S",
    options: [
      { text: "Take the lead and motivate others", score: 5 },
      { text: "Contribute ideas when asked", score: 3 },
      { text: "Prefer to observe and work independently", score: 1 }
    ],
    isActive: true
  },
  
  // Practical Questions (5)
  {
    questionText: "You prefer activities that are:",
    category: "P",
    options: [
      { text: "Hands-on, physical, or involve building/fixing", score: 5 },
      { text: "Mental, analytical, or research-based", score: 1 },
      { text: "Creative and artistic", score: 2 }
    ],
    isActive: true
  },
  {
    questionText: "Your ideal work environment is:",
    category: "P",
    options: [
      { text: "Outdoors, workshop, or field work", score: 5 },
      { text: "Office with computer and desk", score: 1 },
      { text: "Studio or creative space", score: 2 }
    ],
    isActive: true
  },
  {
    questionText: "You're good at:",
    category: "P",
    options: [
      { text: "Physical skills, sports, or using tools", score: 5 },
      { text: "Mental tasks, calculations, or problem-solving", score: 1 },
      { text: "Artistic skills and creative expression", score: 2 }
    ],
    isActive: true
  },
  {
    questionText: "When learning something new, you prefer:",
    category: "P",
    options: [
      { text: "Learning by doing and hands-on practice", score: 5 },
      { text: "Reading manuals and understanding theory first", score: 1 },
      { text: "Watching demonstrations or tutorials", score: 3 }
    ],
    isActive: true
  },
  {
    questionText: "You would enjoy work that involves:",
    category: "P",
    options: [
      { text: "Physical activity, building, or outdoor work", score: 5 },
      { text: "Computer work, data analysis, or research", score: 1 },
      { text: "Designing, creating art, or performing", score: 2 }
    ],
    isActive: true
  },
  
  // Additional Analytical Questions (2)
  {
    questionText: "When presented with a business problem, you prefer to:",
    category: "A",
    options: [
      { text: "Gather data and create detailed analysis reports", score: 5 },
      { text: "Brainstorm innovative solutions with the team", score: 2 },
      { text: "Take immediate practical action", score: 1 }
    ],
    isActive: true
  },
  {
    questionText: "Your favorite type of challenge is:",
    category: "A",
    options: [
      { text: "Solving complex mathematical or logical puzzles", score: 5 },
      { text: "Creating something visually appealing", score: 1 },
      { text: "Organizing and leading a group project", score: 2 }
    ],
    isActive: true
  },
  
  // Additional Creative Questions (2)
  {
    questionText: "When starting a new project, you:",
    category: "C",
    options: [
      { text: "Envision unique and original approaches", score: 5 },
      { text: "Research and analyze best practices first", score: 1 },
      { text: "Consult with team members for input", score: 2 }
    ],
    isActive: true
  },
  {
    questionText: "You're most proud of work that is:",
    category: "C",
    options: [
      { text: "Original, artistic, and aesthetically beautiful", score: 5 },
      { text: "Accurate, efficient, and well-researched", score: 1 },
      { text: "Helpful and makes a positive impact on people", score: 2 }
    ],
    isActive: true
  },
  
  // Additional Social Questions (2)
  {
    questionText: "A rewarding work day for you involves:",
    category: "S",
    options: [
      { text: "Making meaningful connections and helping others", score: 5 },
      { text: "Accomplishing complex tasks independently", score: 1 },
      { text: "Creating or designing something new", score: 2 }
    ],
    isActive: true
  },
  {
    questionText: "When someone needs advice, you:",
    category: "S",
    options: [
      { text: "Eagerly offer support and guidance", score: 5 },
      { text: "Suggest they research the topic thoroughly", score: 2 },
      { text: "Prefer they figure it out themselves", score: 1 }
    ],
    isActive: true
  },
  
  // Additional Practical Questions (2)
  {
    questionText: "You feel most accomplished when:",
    category: "P",
    options: [
      { text: "Building or fixing something with your hands", score: 5 },
      { text: "Solving an analytical problem", score: 1 },
      { text: "Completing a creative project", score: 2 }
    ],
    isActive: true
  },
  {
    questionText: "Your ideal day off includes:",
    category: "P",
    options: [
      { text: "Outdoor activities, sports, or DIY projects", score: 5 },
      { text: "Reading, studying, or learning new concepts", score: 1 },
      { text: "Going to museums, concerts, or art events", score: 2 }
    ],
    isActive: true
  },
  
  // Work Environment Preferences mapped to valid categories
  {
    questionText: "Your preferred work environment is:",
    category: "P",
    options: [
      { text: "Outdoors or field-based", score: 5 },
      { text: "Office with desk and computer", score: 2 },
      { text: "Workshop, lab, or hands-on facility", score: 4 },
      { text: "Creative studio or flexible space", score: 3 }
    ],
    isActive: true
  },
  {
    questionText: "Your ideal work schedule and pace is:",
    category: "S",
    options: [
      { text: "Fast-paced with variety and constant challenges", score: 3 },
      { text: "Steady routine with predictable structure", score: 4 },
      { text: "Flexible with independent time management", score: 2 },
      { text: "Project-based with intense teamwork periods", score: 5 }
    ],
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

    // Insert new questions
    const result = await Question.insertMany(questions);
    console.log(`✅ Successfully seeded ${result.length} questions`);

    // Display summary
    const categories = { A: 0, C: 0, S: 0, P: 0 };
    result.forEach(q => categories[q.category]++);
    console.log('\nQuestions by category:');
    console.log(`  Analytical (A): ${categories.A}`);
    console.log(`  Creative (C): ${categories.C}`);
    console.log(`  Social (S): ${categories.S}`);
    console.log(`  Practical (P): ${categories.P}`);

    await mongoose.connection.close();
    console.log('\n✅ Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding questions:', error);
    process.exit(1);
  }
}

seedQuestions();
