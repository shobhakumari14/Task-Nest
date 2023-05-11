import { IsEmail, IsString, IsOptional, IS_EMAIL} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {

    @ApiProperty({
        description: 'Write your role',
        example: 'user',
        type: String,
    })
    @IsString()
    @IsOptional()
    role: string;

    @ApiProperty({
        description: 'Write your name',
        example: 'Aarav singh',
        type: String,
    })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({
        description: 'Write your name',
        example: 'Aarav singh',
        type: IS_EMAIL,
    })
    @IsEmail()
    @IsOptional()
    email:string;

    @ApiProperty({
        description: 'Enter your new password',
        example: 'qwerty@7845',
        type: String,
    })
    @IsEmail()
    @IsOptional()
    password:string;
}