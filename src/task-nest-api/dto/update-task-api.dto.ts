import { PartialType } from '@nestjs/swagger';
import { CreateTaskApiDto } from './create-task-api.dto';
import { IsString, IsOptional, IsBoolean} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTaskApiDto extends PartialType(CreateTaskApiDto) {

    @ApiProperty({
        description: 'Enter your ID',
        example: '5',
        type: Number,
    })
    @IsString()
    id: number;

    @ApiProperty({
        description: 'Write task title',
        example: 'task list 1',
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
    @IsBoolean()
    status: boolean;

}
