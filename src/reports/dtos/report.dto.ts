import { Expose, Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class ReportDto {

    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    price: number;

    @ApiProperty({
        description: 'enter car maker name',
        example: 'TATA',
        type: String,
    })
    @Expose()
    maker: string;

    @ApiProperty()
    @Expose()
    model: string;

    @ApiProperty()
    @Expose()
    mfgyear: number;

    @ApiProperty()
    @Expose()
    mileage: number;

    @ApiProperty()
    @Expose()
    longitude: number;

    @ApiProperty()
    @Expose()
    latitude: number;

    @ApiProperty()
    @Expose()
    approved: boolean;

    @ApiProperty()
    @Transform(({obj})=>obj.user.id)
    @Expose()
    userId: number;
}