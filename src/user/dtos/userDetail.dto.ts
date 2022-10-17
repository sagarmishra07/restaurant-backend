import { IsEmail, IsNotEmpty, ValidateNested } from "class-validator";
import { UserDto } from "./user.dto";

export class UserDetailsDto{
    id: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    @ValidateNested()
    user: UserDto;
}