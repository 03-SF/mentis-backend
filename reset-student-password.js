require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

async function resetStudentPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const email = 'student@example.com'; // Change this to the student's email
    const newPassword = '12345678';

    const student = await User.findOne({ email });
    
    if (!student) {
      console.log(`❌ Student with email ${email} not found`);
      await mongoose.connection.close();
      process.exit(1);
    }

    console.log(`📋 Found student: ${student.name} (${student.email})`);
    
    // Update password (will be hashed by pre-save middleware)
    student.password = newPassword;
    await student.save();
    
    console.log(`✅ Password reset successfully!`);
    console.log(`\n📝 Login Credentials:`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${newPassword}\n`);

    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

resetStudentPassword();
