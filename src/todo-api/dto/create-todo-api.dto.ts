import { IsString, IsOptional, IsBoolean} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoApiDto {


    @ApiProperty({
        description: 'Write your todo title',
        example: 'shopingList',
        type: String,
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Write your todo',
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
