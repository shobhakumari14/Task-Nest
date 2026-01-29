import {IsEmail, IsOptional, IsString, IS_EMAIL} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto{
    
    @IsOptional()
    @IsString()
    role: string


    @ApiProperty({
        description: 'Write your name',
        example: 'Aarav singh',
        type: String,
    })
    @IsString()
    name: string;


    @ApiProperty({
        description: 'Write your email id',
        example: 'abc@gmail.com',
        type: String,
    })
    @IsEmail()
    email: string;


    @ApiProperty({
        description: 'Set your password',
        example: 'Asdfghj#9876d',
        type: String,
    })
    @IsString()
    password: string;
}