import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
    @IsNotEmpty({"message" :"name requiered"})
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @IsString()
    storeName: string;
}
