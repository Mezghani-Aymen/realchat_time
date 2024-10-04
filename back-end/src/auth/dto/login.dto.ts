import { IsString, IsEmail } from "class-validator"

export class LogInDto {
    @IsEmail()
    email: string

    @IsString()
    password: string
}
