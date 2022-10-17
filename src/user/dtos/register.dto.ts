import { IsNotEmpty, ValidateNested } from "class-validator";
import { InterestDto } from "./interest.dto";
import { UserDetailsDto } from "./userDetail.dto";

export class RegisterDto{
    @IsNotEmpty()
    @ValidateNested()
    userDetails: UserDetailsDto

    @IsNotEmpty()
    @ValidateNested()
    interests: InterestDto[]
}