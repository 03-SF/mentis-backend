import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

class StudentInfo {
  @Prop({ required: true })
  currentEducationLevel: string;

  @Prop({ required: true })
  grade: string;

  @Prop()
  school?: string;

  @Prop()
  city?: string;

  @Prop()
  province?: string;

  @Prop()
  stream?: string;

  @Prop([String])
  subjects?: string[];

  @Prop()
  cgpa?: number;

  @Prop()
  percentage?: number;
}

class Preferences {
  @Prop({ default: 'en' })
  language: string;

  @Prop({ default: true })
  notifications: boolean;

  @Prop({ default: true })
  emailUpdates: boolean;
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop()
  phone?: string;

  @Prop()
  avatar?: string;

  @Prop({ type: StudentInfo, required: true })
  studentInfo: StudentInfo;

  @Prop({ type: Preferences, default: {} })
  preferences: Preferences;

  @Prop({ default: false })
  onboardingCompleted: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ select: false })
  verificationToken?: string;

  @Prop()
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
