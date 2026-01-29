const { User, Result, Recommendation } = require('../models');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getAdminStats = async (req, res, next) => {
  try {
    // Total Users
    const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });

    // Active Users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const activeUsersLast7Days = await Result.distinct('userId', {
      createdAt: { $gte: sevenDaysAgo }
    });
    const activeUsers = activeUsersLast7Days.length;

    // Career Assessments Completed
    const totalAssessments = await Result.countDocuments();

    // Most Selected Careers
    const recommendations = await Recommendation.find()
      .select('recommendedCareers')
      .limit(1000);
    
    const careerCounts = {};
    recommendations.forEach(rec => {
      if (rec.recommendedCareers && Array.isArray(rec.recommendedCareers)) {
        rec.recommendedCareers.forEach(career => {
          careerCounts[career] = (careerCounts[career] || 0) + 1;
        });
      }
    });

    const topCareers = Object.entries(careerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([career, count]) => ({ career, count }));

    // AI Calls Today (from learning path generation)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Count learning path API calls from today
    // Note: This is an estimation based on recommendations created today
    // In production, you should track this in a separate collection
    const aiCallsToday = await Recommendation.countDocuments({
      createdAt: { $gte: today }
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        totalAssessments,
        topCareers,
        aiCallsToday
      }
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    next(error);
  }
};

// @desc    Get all users with assessment data
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsersWithData = async (req, res, next) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } })
      .select('firstName lastName email createdAt isActive')
      .sort({ createdAt: -1 });

    const usersWithData = await Promise.all(
      users.map(async (user) => {
        const assessmentCount = await Result.countDocuments({ userId: user._id });
        const lastAssessment = await Result.findOne({ userId: user._id })
          .sort({ createdAt: -1 })
          .select('createdAt');

        return {
          _id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          createdAt: user.createdAt,
          isActive: user.isActive,
          assessmentCount,
          lastActivity: lastAssessment?.createdAt || user.createdAt
        };
      })
    );

    res.json({
      success: true,
      data: usersWithData
    });
  } catch (error) {
    console.error('Get users with data error:', error);
    next(error);
  }
};
