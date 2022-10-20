import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  id: number;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
