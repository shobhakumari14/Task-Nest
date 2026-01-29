import {Expose} from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';
import { IS_EMAIL } from 'class-validator';

export class UserDto {

    @ApiProperty({
        description: 'Your ID',
        example: '10',
        type: Number,
    })
    @Expose()
    id: number;

    @ApiProperty({
        description: 'Your role',
        example: 'user',
        type: String,
    })
    @Expose()
    role: string;

    @ApiProperty({
        description: 'Your name',
        example: 'Aarav singh',
        type: String,
    })
    @Expose()
    name: string;

    @ApiProperty({
        description: 'Your email',
        example: 'abc@gmail.com',
        type: String,
    })
    @Expose()
    email: string;

}