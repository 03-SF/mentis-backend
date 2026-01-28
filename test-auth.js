// Test script for auth endpoints
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/auth';

const testData = {
  register: {
    name: 'Test User',
    email: 'test@example.com',
    password: 'test123',
    role: 'student'
  },
  login: {
    email: 'test@example.com',
    password: 'test123'
  }
};

async function testRegister() {
  try {
    console.log('\n📝 Testing Registration...');
    const response = await axios.post(`${BASE_URL}/register`, testData.register);
    console.log('✔ Register successful:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log('✖ Register failed:', error.response.data);
    } else {
      console.log('✖ Error:', error.message);
    }
  }
}

async function testLogin() {
  try {
    console.log('\n🔐 Testing Login...');
    const response = await axios.post(`${BASE_URL}/login`, testData.login);
    console.log('✔ Login successful:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log('✖ Login failed:', error.response.data);
    } else {
      console.log('✖ Error:', error.message);
    }
  }
}

async function runTests() {
  console.log('=================================');
  console.log('  AUTH ENDPOINTS TEST');
  console.log('=================================');
  console.log('Make sure the backend server is running on port 5000');
  
  await testRegister();
  await testLogin();
  
  console.log('\n=================================');
  console.log('Tests completed!');
  console.log('=================================\n');
}

runTests();
