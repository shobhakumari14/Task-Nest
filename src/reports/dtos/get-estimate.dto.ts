import {
    IsString,
    IsNumber,
    Min,
    Max,
    IsLongitude,
    IsLatitude,
} from 'class-validator';
import { Transform} from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export class GetEstimateDto {

    @ApiProperty({type: String})
    @IsString()
    maker: string;

    @ApiProperty({type: String})
    @IsString()
    model: string;

    @ApiProperty({type: Number})
    @Transform(({value})=>parseInt(value))
    @IsNumber()
    @Min(1947)
    @Max(2022)
    mfgyear: number;

    @ApiProperty({type: Number})
    @Transform(({value})=>parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;
    
    @ApiProperty({type: Number})
    @Transform(({value})=>parseFloat(value))
    @IsLongitude()
    longitude: number;
    
    @ApiProperty({type: Number})
    @ApiProperty({type: Number})
    @IsLatitude()
    latitude: number;
}