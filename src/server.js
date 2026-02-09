const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/database');
const config = require('./config');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (config.nodeEnv === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Routes
console.log('Loading routes...');
routes(app);
console.log('Routes loaded successfully');

// List all registered routes
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`  ${Object.keys(r.route.methods).join(', ').toUpperCase()} ${r.route.path}`);
  } else if (r.name === 'router') {
    r.handle.stack.forEach((handler) => {
      if (handler.route) {
        const path = r.regexp.toString().replace('/^', '').replace('\\/?(?=\\/|$)/i', '');
        console.log(`  ${Object.keys(handler.route.methods).join(', ').toUpperCase()} ${path}${handler.route.path}`);
      }
    });
  }
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server function
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();
    
    // Then start the server
    const PORT = config.port;
    app.listen(PORT, () => {
      console.log(`✔ Server running in ${config.nodeEnv} mode on port ${PORT}`);
      console.log(`✔ Server is ready to accept requests`);
    });
  } catch (error) {
    console.error('✖ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

module.exports = app;
