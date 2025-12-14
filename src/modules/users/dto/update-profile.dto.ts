import { IsOptional, IsString, IsObject } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @IsOptional()
  @IsObject()
  studentInfo?: {
    currentEducationLevel?: string;
    grade?: string;
    school?: string;
    city?: string;
    province?: string;
    stream?: string;
    subjects?: string[];
    cgpa?: number;
    percentage?: number;
  };

  @IsOptional()
  @IsObject()
  preferences?: {
    language?: string;
    notifications?: boolean;
    emailUpdates?: boolean;
  };
}
