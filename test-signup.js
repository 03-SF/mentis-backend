const axios = require('axios');

async function testSignup() {
  try {
    const response = await axios.post('http://localhost:3001/api/auth/signup', {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      studentInfo: {
        currentEducationLevel: 'undergraduate',
        grade: '2nd Year'
      }
    });
    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    console.error('Status:', error.response?.status);
  }
}

testSignup();
