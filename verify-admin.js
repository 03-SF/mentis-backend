require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

async function verifyAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find admin by email
    let admin = await User.findOne({ email: 'admin@gmail.com' }).select('+password');
    
    if (!admin) {
      console.log('❌ Admin account with email admin@gmail.com not found');
      console.log('Creating new admin account...\n');
      
      // Hash password
      const hashedPassword = await bcrypt.hash('12345678', 10);
      
      // Create admin
      admin = await User.create({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      console.log('✅ Admin account created successfully!');
    } else {
      console.log('✅ Admin account found!');
      console.log(`   Name: ${admin.name}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Role: ${admin.role}`);
      
      // Test password
      const isMatch = await bcrypt.compare('12345678', admin.password);
      console.log(`   Password test: ${isMatch ? '✅ VALID' : '❌ INVALID'}`);
      
      if (!isMatch) {
        console.log('\n🔧 Fixing password...');
        admin.password = '12345678'; // Will be hashed by pre-save middleware
        await admin.save();
        console.log('✅ Password updated successfully!');
      }
    }

    console.log('\n📝 Admin Login Credentials:');
    console.log('   Email: admin@gmail.com');
    console.log('   Password: 12345678\n');

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

verifyAdmin();
