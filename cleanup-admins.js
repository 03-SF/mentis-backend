require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function cleanupAdmins() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find all admin users
    const admins = await User.find({ role: 'admin' }).select('firstName lastName email createdAt');
    
    if (admins.length === 0) {
      console.log('❌ No admin users found in database');
      await mongoose.connection.close();
      rl.close();
      return;
    }

    console.log(`📊 Found ${admins.length} admin user(s):\n`);
    admins.forEach((admin, index) => {
      console.log(`${index + 1}. ${admin.firstName} ${admin.lastName} (${admin.email}) - Created: ${admin.createdAt.toLocaleDateString()}`);
    });

    if (admins.length === 1) {
      console.log('\n✅ Only one admin account exists - no cleanup needed');
      await mongoose.connection.close();
      rl.close();
      return;
    }

    console.log('\n');
    rl.question('Enter the number of the admin account to KEEP (all others will be deleted): ', async (answer) => {
      const keepIndex = parseInt(answer) - 1;

      if (isNaN(keepIndex) || keepIndex < 0 || keepIndex >= admins.length) {
        console.log('❌ Invalid selection');
        await mongoose.connection.close();
        rl.close();
        return;
      }

      const keepAdmin = admins[keepIndex];
      const deleteAdmins = admins.filter((_, index) => index !== keepIndex);

      console.log(`\n🔐 Keeping: ${keepAdmin.firstName} ${keepAdmin.lastName} (${keepAdmin.email})`);
      console.log(`🗑️  Deleting ${deleteAdmins.length} admin account(s):`);
      deleteAdmins.forEach(admin => {
        console.log(`   - ${admin.firstName} ${admin.lastName} (${admin.email})`);
      });

      rl.question('\nAre you sure? Type "yes" to confirm: ', async (confirm) => {
        if (confirm.toLowerCase() === 'yes') {
          const deleteIds = deleteAdmins.map(admin => admin._id);
          const result = await User.deleteMany({ _id: { $in: deleteIds } });
          
          console.log(`\n✅ Successfully deleted ${result.deletedCount} admin account(s)`);
          console.log(`✅ Admin account ${keepAdmin.email} has been retained\n`);
        } else {
          console.log('\n❌ Operation cancelled');
        }

        await mongoose.connection.close();
        rl.close();
        console.log('Database connection closed');
      });
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    rl.close();
    process.exit(1);
  }
}

cleanupAdmins();
