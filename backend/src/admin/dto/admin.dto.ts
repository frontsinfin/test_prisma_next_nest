import { IsEmail, IsString, MinLength } from 'class-validator';

export class AdminDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Не менее 8 символов' })
  password: string;
}
