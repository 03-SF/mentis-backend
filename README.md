# Mentis AI Backend

Node.js + Express REST API with MongoDB Atlas

## Project Structure

```
backend/
├── src/
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── config/          # Configuration files
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── server.js        # Entry point
├── .env.example         # Environment variables template
├── .gitignore
└── package.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Update the `.env` file with your MongoDB Atlas credentials:

```
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mentis-db?retryWrites=true&w=majority

# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS Origin
CORS_ORIGIN=http://localhost:3000
```

### 3. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update `MONGODB_URI` in `.env`

### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Users (Admin)
- `GET /api/users` - Get all users (admin/moderator only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### Profile
- `GET /api/profile` - Get current user's profile
- `PUT /api/profile` - Update current user's profile
- `DELETE /api/profile` - Delete current user's profile
- `GET /api/profile/:userId` - Get profile by user ID

### Health Check
- `GET /api/health` - Check server status

## Database Schemas

### User Schema
```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['user', 'admin', 'moderator']),
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Profile Schema
```javascript
{
  user: ObjectId (ref: 'User', unique),
  firstName: String,
  lastName: String,
  displayName: String,
  avatar: String,
  bio: String,
  phoneNumber: String,
  dateOfBirth: Date,
  location: {
    city: String,
    state: String,
    country: String
  },
  socialLinks: {
    twitter: String,
    linkedin: String,
    github: String,
    website: String
  },
  preferences: {
    theme: String (enum: ['light', 'dark', 'auto']),
    language: String,
    notifications: {
      email: Boolean,
      push: Boolean,
      sms: Boolean
    }
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting (100 requests per 15 minutes)
- Password hashing with bcrypt
- JWT token authentication
- Input validation with express-validator
- Role-based access control

## Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [] // Optional validation errors
}
```

## Development

- Node.js version: 18+ recommended
- Uses ES6+ features
- Nodemon for auto-reload during development

## License

ISC
