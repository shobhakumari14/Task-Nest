import { PartialType } from '@nestjs/swagger';
import { CreateTodoApiDto } from './create-todo-api.dto';
import { IsString, IsOptional, IsBoolean} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTodoApiDto extends PartialType(CreateTodoApiDto) {

    @ApiProperty({
        description: 'Enter your ID',
        example: '5',
        type: Number,
    })
    @IsString()
    id: number;

    @ApiProperty({
        description: 'Write todo title',
        example: 'todo list 1',
        type: String,
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Write your name',
        example: 'going to buy phone cover tommorow',
        type: String,
    })
    @IsString()
    content: string;

    @ApiProperty({})
    @IsString()
    status: string;
}
