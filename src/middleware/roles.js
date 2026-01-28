const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    console.log('=== ROLE MIDDLEWARE DEBUG ===');
    console.log('req.user:', req.user);
    console.log('req.user.role:', req.user?.role);
    console.log('allowedRoles:', allowedRoles);
    console.log('============================');
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      console.log('ROLE CHECK FAILED!');
      console.log('User role:', req.user.role, 'Type:', typeof req.user.role);
      console.log('Allowed roles:', allowedRoles);
      return res.status(403).json({
        success: false,
        message: `Access denied. This route requires one of the following roles: ${allowedRoles.join(', ')}`
      });
    }

    console.log('ROLE CHECK PASSED!');
    next();
  };
};

module.exports = roleMiddleware;
