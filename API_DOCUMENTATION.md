# Authentication API Documentation

## Base URL
```
http://localhost:5000/api/auth
```

## Endpoints

### 1. Register New User
**POST** `/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

**Validation Rules:**
- `name`: Required, 2-100 characters
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters
- `role`: Optional, either "student" or "admin" (default: "student")

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400`: Validation error or email already exists
- `500`: Server error

---

### 2. Login User
**POST** `/login`

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `email`: Required, valid email format
- `password`: Required

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400`: Missing email or password
- `401`: Invalid credentials
- `500`: Server error

---

### 3. Get Current User
**GET** `/me`

Get the currently authenticated user's information.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "createdAt": "2026-01-11T10:00:00.000Z",
      "updatedAt": "2026-01-11T10:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- `401`: Unauthorized (missing or invalid token)
- `500`: Server error

---

## Testing Examples

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "role": "student"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

**Get Current User:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using JavaScript (Frontend)

```javascript
// Register
const registerResponse = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    password: 'test123',
    role: 'student'
  })
});
const registerData = await registerResponse.json();

// Login
const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'test123'
  })
});
const loginData = await loginResponse.json();

// Get Current User (with token)
const token = loginData.data.token;
const meResponse = await fetch('http://localhost:5000/api/auth/me', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const meData = await meResponse.json();
```

---

## Security Notes

1. **Password Security**: Passwords are hashed using bcrypt with 10 salt rounds before storage
2. **JWT Tokens**: Tokens expire after 7 days (configurable via JWT_EXPIRES_IN env variable)
3. **Email Uniqueness**: Duplicate email registrations are prevented
4. **CORS**: Cross-origin requests are enabled for the frontend URL
5. **Sensitive Data**: Passwords are never returned in API responses

---

## Learning Path API

### Generate Learning Path
**POST** `/api/learning-path/generate`

Generate multiple learning pathways for a specific career using Gemini AI.

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "career": "Graphic Design",
  "userLevel": "Grade 10 / O Levels",
  "countryContext": "Pakistan"
}
```

**Parameters:**
- `career` (required): The career to generate pathways for
- `userLevel` (optional): Student's current education level (default: "Grade 10 / O Levels")
- `countryContext` (optional): Geographic context (default: "Generic / Global")

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "career": "Graphic Design",
    "userLevel": "Grade 10 / O Levels",
    "countryContext": "Pakistan",
    "paths": [
      {
        "type": "Academic Path",
        "description": "Traditional educational route through formal degrees",
        "duration": "4-6 years",
        "steps": [
          "Choose Arts or Computer Studies in A Levels",
          "Bachelor's in Graphic Design or Visual Communication",
          "Internship at design studio",
          "Junior Graphic Designer role"
        ]
      },
      {
        "type": "Skill-Based Path",
        "description": "Focus on practical skills and portfolio building",
        "duration": "1-2 years",
        "steps": [
          "Learn Adobe Photoshop & Illustrator",
          "Complete online design courses",
          "Build a portfolio with real projects",
          "Apply for freelance or junior roles"
        ]
      },
      {
        "type": "Hybrid Path",
        "description": "Combination of formal education and practical skills",
        "duration": "2-3 years",
        "steps": [
          "Short design diploma after O Levels",
          "Online skill courses",
          "Internship or freelance projects"
        ]
      }
    ],
    "generatedAt": "2026-01-25T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Career not provided
- `401`: Unauthorized (invalid/missing token)
- `500`: AI generation failed or server error

**Important Notes:**
- Uses Google Gemini AI (gemini-pro model)
- Generates 3-4 different pathway types
- Pathways are advisory, not ranked
- Falls back to generic paths if AI unavailable
- Requires `GEMINI_API_KEY` environment variable

---

## Environment Variables Required

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
GEMINI_API_KEY=your_google_gemini_api_key
```
