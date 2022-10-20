import { IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import { UserDto } from './user.dto';

export class UserDetailsDto {
  id: number;

  @IsEmail()
  email: string;

  city: string;

  @ValidateNested()
  user: UserDto;
}
