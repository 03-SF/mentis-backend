# MENTIS AI - Backend Server

AI-powered career guidance platform for Pakistani students built with NestJS, Express, and MongoDB.

## 🚀 Tech Stack

- **Framework**: NestJS 11
- **Runtime**: Node.js 
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (Passport)
- **Validation**: class-validator & class-transformer
- **Language**: TypeScript

## 📁 Project Structure

```
src/
├── config/              # Configuration files
│   ├── app.config.ts
│   ├── database.config.ts
│   └── jwt.config.ts
├── common/              # Shared utilities
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── interfaces/
├── modules/             # Feature modules
│   ├── users/          ✅ Complete
│   ├── auth/           ⏳ TODO
│   ├── assessments/    ⏳ TODO
│   ├── careers/        ⏳ TODO
│   ├── skills/         ⏳ TODO
│   ├── recommendations/ ⏳ TODO
│   ├── learning-paths/ ⏳ TODO
│   └── institutions/   ⏳ TODO
├── app.module.ts
└── main.ts
```

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn**

### Installation

**1. Install Dependencies**
```bash
cd mentis-ai-backend
npm install
```

**2. Environment Configuration**

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/mentis-ai
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_EXPIRATION=7d
JWT_REFRESH_SECRET=your-refresh-secret-change-this-too
JWT_REFRESH_EXPIRATION=30d
FRONTEND_URL=http://localhost:3000
THROTTLE_TTL=60000
THROTTLE_LIMIT=100
OPENAI_API_KEY=your-openai-api-key
```

**3. Start MongoDB**

⚠️ **CRITICAL: MongoDB MUST be running before starting the server!**

**Option A: Local MongoDB**
```bash
# Windows (if installed as service)
net start MongoDB

# OR run manually
mongod --dbpath="C:\data\db"

# Linux/Mac
sudo systemctl start mongod
```

**Verify MongoDB is running:**
```bash
# PowerShell
Test-NetConnection localhost -Port 27017
# Should show: TcpTestSucceeded : True

# Command Prompt / Bash
mongo --eval "db.version()"
# Should show MongoDB version
```

**Option B: MongoDB Atlas (Cloud)**
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
4. Update `MONGODB_URI` in `.env` with your connection string

**4. Run Development Server**
```bash
npm run start:dev
```

✅ **Success!** Server should start at: `http://localhost:3001/api`

You should see:
```
🚀 MENTIS AI Backend is running on http://localhost:3001/api
📚 Environment: development
```

### Available Scripts

```bash
npm run start         # Start production server
npm run start:dev     # Start development server with hot-reload
npm run start:debug   # Start with debugging
npm run build         # Build for production
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
npm run test          # Run unit tests
npm run test:e2e      # Run end-to-end tests
npm run test:cov      # Run tests with coverage
```

## 🔌 API Endpoints

### Health Check
```
GET /api          # Server health check
```

### Users Module (✅ Implemented)
```
GET    /api/users/me              # Get current user profile
PATCH  /api/users/me              # Update current user
DELETE /api/users/me              # Delete account
GET    /api/users/me/dashboard    # Get dashboard stats
GET    /api/users/:id             # Get user by ID
```

### Upcoming Modules (⏳ TODO)

- **Auth**: `/api/auth/*` - Registration, Login, JWT tokens
- **Assessments**: `/api/assessments/*` - Psychometric tests
- **Careers**: `/api/careers/*` - Career exploration
- **Skills**: `/api/skills/*` - Skill tracking
- **Recommendations**: `/api/recommendations/*` - AI career matches
- **Learning Paths**: `/api/learning-paths/*` - Learning resources
- **Institutions**: `/api/institutions/*` - Pakistani universities

## 🗄️ Database Schema

See [`DATABASE_SCHEMA.md`](../DATABASE_SCHEMA.md) for complete schema documentation.

### Key Collections

1. **users** - Student profiles with Pakistani education context
2. **assessment_results** - Psychometric test outcomes
3. **careers** - Career path master data (Pakistani job market)
4. **skills** - Skill definitions
5. **user_skills** - Student skill proficiency tracking
6. **recommendations** - AI-generated career matches
7. **learning_paths** - Structured learning plans
8. **institutions** - Pakistani universities/colleges
9. **labor_market_data** - Job market trends in Pakistan

## 🔒 Authentication

JWT-based authentication with access and refresh tokens.

```typescript
// Protected route example
@UseGuards(JwtAuthGuard)
@Get('protected')
getProtectedData(@CurrentUser() user) {
  return user;
}

// Public route
@Public()
@Post('public')
publicEndpoint() {
  return 'Accessible without auth';
}
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 Code Style

- ESLint for linting
- Prettier for formatting
- TypeScript strict mode

```bash
npm run lint           # Check for issues
npm run lint -- --fix  # Auto-fix issues
npm run format         # Format all files
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm run start:prod
```

### Environment Variables for Production

Make sure to update these in production:
- `NODE_ENV=production`
- `JWT_SECRET` - Use a strong, unique secret
- `JWT_REFRESH_SECRET` - Use a different strong secret
- `MONGODB_URI` - Use your production MongoDB URI
- `FRONTEND_URL` - Your production frontend URL

## 🔧 Configuration

### CORS

Configured in `main.ts`:
```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
});
```

### Validation

Global validation pipe automatically validates DTOs:
```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
}));
```

### Rate Limiting

Configured in `app.module.ts`:
- 100 requests per minute per IP by default
- Customizable per endpoint

## 🐛 Troubleshooting

### ❌ MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: 
1. Check if MongoDB is running: `Test-NetConnection localhost -Port 27017`
2. If not, start MongoDB: `net start MongoDB` (Windows) or `sudo systemctl start mongod` (Linux)
3. Or use MongoDB Atlas cloud database

### ❌ Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3001
```
**Solution**: 
- Change `PORT` in `.env` file, OR
- Kill the process using port 3001:
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process

# Linux/Mac
lsof -ti:3001 | xargs kill
```

### ❌ Module Not Found
```
Error: Cannot find module '@nestjs/mongoose'
```
**Solution**: 
```bash
npm install
```

### ❌ JWT Secret Warning
```
Warning: No JWT secret provided
```
**Solution**: Make sure `.env` file exists and has `JWT_SECRET` set

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB Documentation](https://www.mongodb.com/docs)
- [Passport JWT Documentation](http://www.passportjs.org/packages/passport-jwt/)

## 📄 License

UNLICENSED - Private Project

## 👥 Team

MENTIS AI Development Team

---

## 📊 Current Progress

**✅ Completed:**
- Base server setup with NestJS
- MongoDB connection configuration
- Users module with CRUD operations
- Configuration management (.env support)
- Global error handling
- Request validation
- Rate limiting
- CORS configuration
- Pakistani education system integration (enums for provinces, education levels, streams)

**⏳ In Progress / Next Steps:**
1. **Auth Module** (HIGH PRIORITY)
   - JWT strategy implementation
   - Login/Register endpoints
   - Password reset functionality
   - Email verification

2. **Assessments Module**
   - Psychometric test questions
   - Scoring algorithms
   - Results interpretation

3. **Careers Module**
   - Career database seeding
   - Search and filtering
   - Related careers logic

4. **AI Recommendations**
   - OpenAI integration
   - Match score calculation
   - Personalized insights

---

**Status**: 🚧 In Development | **Last Updated**: December 2025
