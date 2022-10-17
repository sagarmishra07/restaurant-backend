import { IsNotEmpty } from "class-validator";

export class UserDto{
    id: number;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}