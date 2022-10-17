import { IsNotEmpty, ValidateNested } from "class-validator";
import { UserDetailsDto } from "./userDetail.dto";

export class InterestDto{
    id: number;

    @IsNotEmpty()
    interest: string;

    @ValidateNested()
    userDetail: UserDetailsDto;
}