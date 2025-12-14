import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

class StudentInfo {
  @Prop({ required: true, type: String })
  currentEducationLevel: string;

  @Prop({ required: true, type: String })
  grade: string;

  @Prop({ type: String })
  school?: string;

  @Prop({ type: String })
  city?: string;

  @Prop({ type: String })
  province?: string;

  @Prop({ type: String })
  stream?: string;

  @Prop({ type: [String] })
  subjects?: string[];

  @Prop({ type: Number })
  cgpa?: number;

  @Prop({ type: Number })
  percentage?: number;
}

class Preferences {
  @Prop({ default: 'en', type: String })
  language: string;

  @Prop({ default: true, type: Boolean })
  notifications: boolean;

  @Prop({ default: true, type: Boolean })
  emailUpdates: boolean;
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, lowercase: true, trim: true, type: String })
  email: string;

  @Prop({ required: true, select: false, type: String })
  password: string;

  @Prop({ required: true, trim: true, type: String })
  firstName: string;

  @Prop({ required: true, trim: true, type: String })
  lastName: string;

  @Prop({ required: true, enum: ['student', 'admin'], default: 'student', type: String })
  role: string;

  @Prop({ type: String })
  phone?: string;

  @Prop({ type: String })
  avatar?: string;

  @Prop({ type: String })
  bio?: string;

  @Prop({ type: String })
  dateOfBirth?: string;

  @Prop({ type: StudentInfo, required: true })
  studentInfo: StudentInfo;

  @Prop({ type: Preferences, default: {} })
  preferences: Preferences;

  @Prop({ default: false, type: Boolean })
  onboardingCompleted: boolean;

  @Prop({ default: true, type: Boolean })
  isActive: boolean;

  @Prop({ default: false, type: Boolean })
  isVerified: boolean;

  @Prop({ select: false, type: String })
  verificationToken?: string;

  @Prop({ type: Date })
  lastLoginAt?: Date;

  createdAt: Date;
  updatedAt: Date;

  // Method to compare password
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Indexes (email index is automatically created by unique: true decorator)
UserSchema.index({ 'studentInfo.city': 1 });
UserSchema.index({ 'studentInfo.province': 1 });

// Pre-save middleware to hash password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};
