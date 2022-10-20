import { IsNotEmpty, ValidateNested } from 'class-validator';
import { UserDetailsDto } from './userDetail.dto';

export class RegisterDto {
  @ValidateNested()
  userDetails: UserDetailsDto;
}
