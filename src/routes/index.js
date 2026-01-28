const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const profileRoutes = require('./profileRoutes');
const assessmentRoutes = require('./assessmentRoutes');
const recommendationRoutes = require('./recommendationRoutes');
const learningPathRoutes = require('./learningPathRoutes');

module.exports = (app) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/profile', profileRoutes);
  app.use('/api/assessment', assessmentRoutes);
  app.use('/api/recommendation', recommendationRoutes);
  app.use('/api/learning-path', learningPathRoutes);

  // Health check route
  app.get('/api/health', (req, res) => {
    res.json({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString()
    });
  });

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found'
    });
  });
};
