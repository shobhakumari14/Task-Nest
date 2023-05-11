import {
    IsString,
    IsNumber,
    Min,
    Max,
    IsLongitude,
    IsLatitude,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateReportDto {
    @ApiProperty({
        description: 'enter your car estimate price',
        example: '258963',
        type: Number,
    })
    @IsNumber()
    @Min(0)
    @Max(10000000)
    price: number;

    @ApiProperty({
        description: 'enter car model name',
        example: 'nexon',
        type: String,
    })
    @IsString()
    maker: string;

    @ApiProperty({type: String})
    @IsString()
    model: string;

    @ApiProperty({
        description: 'enter car mfg. year',
        example: '2020',
        type: Number,
    })
    @IsNumber()
    @Min(1947)
    @Max(2022)
    mfgyear: number;

    @ApiProperty({
        description: 'enter car estimate mileage ',
        example: '10000',
        type: Number,
    })
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;
    
    @ApiProperty({type: Number})
    @IsLongitude()
    longitude: number;
    
    @ApiProperty({type: Number})
    @IsLatitude()
    latitude: number;
}