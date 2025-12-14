import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class StudentInfoDto {
  @IsString()
  @IsNotEmpty()
  currentEducationLevel: string;

  @IsString()
  @IsNotEmpty()
  grade: string;

  @IsString()
  @IsOptional()
  school?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  province?: string;

  @IsString()
  @IsOptional()
  stream?: string;

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

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @IsNotEmpty()
  password: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @ValidateNested()
  @Type(() => StudentInfoDto)
  @IsNotEmpty()
  studentInfo: StudentInfoDto;
}
