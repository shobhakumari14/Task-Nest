import { IS_EMAIL, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninUserDto {
  @ApiProperty({
    description: 'Enter your user email',
    example: 'abc@gmail.com',
    type: String,
})
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Enter your user password',
    example: 'abc@gmail.com',
    type: String,
})
  @IsString()
  password: string;
}
