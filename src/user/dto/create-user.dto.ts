import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
@IsNotEmpty( {message: 'name must not be empty'})
@IsString( {message: 'name must be a string'})
 name: string;

@IsEmail( {},{message: 'email must be an email'})
 email: string;

 @IsNumber({ maxDecimalPlaces: 0},{message: 'phone must be a number'})
 phone: number;
    
}
