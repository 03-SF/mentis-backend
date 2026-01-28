const { Profile } = require('../models');

// @desc    Create or get current user's profile
// @route   POST /api/profile
// @access  Private
exports.createProfile = async (req, res, next) => {
  try {
    const { educationLevel, subjects, interests, city, firstName, lastName, bio } = req.body;

    // Check if profile already exists
    let profile = await Profile.findOne({ user: req.user._id });
    
    if (profile) {
      return res.status(400).json({
        success: false,
        message: 'Profile already exists. Use PUT to update.'
      });
    }

    // Create new profile
    profile = await Profile.create({
      user: req.user._id,
      educationLevel,
      subjects: subjects || [],
      interests: interests || [],
      city,
      firstName,
      lastName,
      bio
    });

    await profile.populate('user', 'email role name');

    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: { profile }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user's profile
// @route   GET /api/profile/me
// @access  Private
exports.getMyProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate('user', 'email role name');
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found.'
      });
    }

    res.json({
      success: true,
      data: { profile }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update current user's profile
// @route   PUT /api/profile/me
// @access  Private
exports.updateMyProfile = async (req, res, next) => {
  try {
    const {
      educationLevel,
      subjects,
      interests,
      city,
      firstName,
      lastName,
      displayName,
      bio,
      phoneNumber,
      dateOfBirth,
      location,
      socialLinks,
      preferences
    } = req.body;

    let profile = await Profile.findOne({ user: req.user._id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found. Create one first.'
      });
    }

    // Update new required fields
    if (educationLevel !== undefined) profile.educationLevel = educationLevel;
    if (subjects !== undefined) profile.subjects = subjects;
    if (interests !== undefined) profile.interests = interests;
    if (city !== undefined) profile.city = city;

    // Update existing fields
    if (firstName !== undefined) profile.firstName = firstName;
    if (lastName !== undefined) profile.lastName = lastName;
    if (displayName !== undefined) profile.displayName = displayName;
    if (bio !== undefined) profile.bio = bio;
    if (phoneNumber !== undefined) profile.phoneNumber = phoneNumber;
    if (dateOfBirth !== undefined) profile.dateOfBirth = dateOfBirth;
    if (location !== undefined) profile.location = { ...profile.location, ...location };
    if (socialLinks !== undefined) profile.socialLinks = { ...profile.socialLinks, ...socialLinks };
    if (preferences !== undefined) profile.preferences = { ...profile.preferences, ...preferences };

    await profile.save();
    await profile.populate('user', 'email role name');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { profile }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get profile by user ID
// @route   GET /api/profile/:userId
// @access  Private
exports.getProfileByUserId = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate('user', 'email role');
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found.'
      });
    }

    res.json({
      success: true,
      data: { profile }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete current user's profile
// @route   DELETE /api/profile
// @access  Private
exports.deleteMyProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found.'
      });
    }

    await profile.deleteOne();

    res.json({
      success: true,
      message: 'Profile deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
