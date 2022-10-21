import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from '../entity/user.entity';

export class UserDetailsDto {
  id: number;

  @IsString()
  @MinLength(10)
  @MaxLength(10)
  phone: String;

  @IsOptional()
  user: User;
}
