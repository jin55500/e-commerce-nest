
import { IsString, IsEmail, MinLength, IsNotEmpty, IsOptional } from 'class-validator';

export class UserUpdateDto {
    @IsNotEmpty({"message" :"name requiered"})
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @IsString()
    storeName: string;
}
