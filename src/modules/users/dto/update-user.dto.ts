import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsEnum,
  IsNumber,
  IsArray,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  EducationLevel,
  Province,
  Stream,
  Language,
} from '../../../common/interfaces/enums';

class UpdateStudentInfoDto {
  @IsEnum(EducationLevel)
  @IsOptional()
  currentEducationLevel?: EducationLevel;

  @IsString()
  @IsOptional()
  grade?: string;

  @IsString()
  @IsOptional()
  school?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsEnum(Province)
  @IsOptional()
  province?: Province;

  @IsEnum(Stream)
  @IsOptional()
  stream?: Stream;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  subjects?: string[];

  @IsNumber()
  @IsOptional()
  cgpa?: number;

  @IsNumber()
  @IsOptional()
  percentage?: number;
}

class UpdatePreferencesDto {
  @IsEnum(Language)
  @IsOptional()
  language?: Language;

  @IsBoolean()
  @IsOptional()
  notifications?: boolean;

  @IsBoolean()
  @IsOptional()
  emailUpdates?: boolean;
}

export class UpdateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @IsOptional()
  firstName?: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @ValidateNested()
  @Type(() => UpdateStudentInfoDto)
  @IsOptional()
  studentInfo?: UpdateStudentInfoDto;

  @ValidateNested()
  @Type(() => UpdatePreferencesDto)
  @IsOptional()
  preferences?: UpdatePreferencesDto;

  @IsBoolean()
  @IsOptional()
  onboardingCompleted?: boolean;
}
