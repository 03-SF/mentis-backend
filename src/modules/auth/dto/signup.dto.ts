import { IsEmail, IsString, MinLength, IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class SignupStudentInfoDto {
  @IsNotEmpty()
  @IsString()
  currentEducationLevel: string;

  @IsNotEmpty()
  @IsString()
  grade: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsString()
  stream?: string;
}

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ValidateNested()
  @Type(() => SignupStudentInfoDto)
  @IsNotEmpty()
  studentInfo: SignupStudentInfoDto;
}
