import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// import { CustomValidator } from '../validator/custom.validator';

export class CreateMessageDto {
  //----===Custom-Validator-for-Validation===----------
  // @IsString()
  // @Validate(CustomValidator)
  // content: string;
  //---------------------------------------------------

  //----===Class-Validator-for-Validation===----------
  // @IsNotEmpty({
  //     message: "need to be filled"
  // })
  // @Length(5, 20, {
  //     message: (args: ValidationArguments) => {
  //         if (args.value.length === 1) {
  //             return "Too short"
  //         } else {
  //             return 'minimum length is $constraint1 and Maximum $constraint2 characters';
  //         }
  //     }
  // })
  @ApiProperty({
    description: 'Write a message',
    example: 'Hi there!',
  })
  @IsString()
  content: string;
}

