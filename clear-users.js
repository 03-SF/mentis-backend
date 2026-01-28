const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function clearUsers() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✔ Connected to MongoDB');

    // Clear users collection
    const usersDeleted = await mongoose.connection.collection('users').deleteMany({});
    console.log(`✔ Deleted ${usersDeleted.deletedCount} users`);

    // Clear profiles collection
    const profilesDeleted = await mongoose.connection.collection('profiles').deleteMany({});
    console.log(`✔ Deleted ${profilesDeleted.deletedCount} profiles`);

    console.log('\n✅ Database cleared successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

clearUsers();
