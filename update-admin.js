require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

async function updateAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find the admin user
    const admin = await User.findOne({ role: 'admin' });
    
    if (!admin) {
      console.log('❌ No admin user found. Creating new admin...');
      
      // Hash the password
      const hashedPassword = await bcrypt.hash('12345678', 10);
      
      // Create new admin
      const newAdmin = await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'admin',
        isActive: true
      });
      
      console.log('✅ New admin created successfully!');
      console.log(`   Email: ${newAdmin.email}`);
      console.log(`   Password: 12345678\n`);
    } else {
      console.log(`📋 Current admin: ${admin.email}\n`);
      
      // Hash the new password
      const hashedPassword = await bcrypt.hash('12345678', 10);
      
      // Update admin credentials
      admin.email = 'admin@gmail.com';
      admin.password = hashedPassword;
      admin.firstName = 'Admin';
      admin.lastName = 'User';
      await admin.save();
      
      console.log('✅ Admin account updated successfully!');
      console.log(`   Email: admin@gmail.com`);
      console.log(`   Password: 12345678\n`);
    }

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

updateAdmin();
