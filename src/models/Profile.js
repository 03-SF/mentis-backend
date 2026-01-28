const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    educationLevel: {
      type: String,
      enum: ['high-school', 'intermediate', 'bachelors', 'masters', 'phd', 'other'],
      trim: true
    },
    subjects: {
      type: [String],
      default: []
    },
    interests: {
      type: [String],
      default: []
    },
    city: {
      type: String,
      trim: true
    },
    firstName: {
      type: String,
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    displayName: {
      type: String,
      trim: true,
      maxlength: [100, 'Display name cannot exceed 100 characters']
    },
    avatar: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s-()]+$/, 'Please provide a valid phone number']
    },
    dateOfBirth: {
      type: Date
    },
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
      theme: {
        type: String,
        enum: ['light', 'dark', 'auto'],
        default: 'auto'
      },
      language: {
        type: String,
        default: 'en'
      },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        sms: { type: Boolean, default: false }
      }
    }
  },
  {
    timestamps: true
  }
);

// Virtual for full name
profileSchema.virtual('fullName').get(function () {
  if (this.firstName && this.lastName) {
    return `${this.firstName} ${this.lastName}`;
  }
  return this.displayName || 'Anonymous';
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
