import { IsString, IsOptional, IsBoolean} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskApiDto {


    @ApiProperty({
        description: 'Write your task title',
        example: 'shopingList',
        type: String,
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Write your task',
        example: 'shampoo',
        type: String,
    })
    @IsString()
    content: string;
    
    @IsOptional()
    @ApiProperty({})
    @IsBoolean()
    status: boolean;

}
