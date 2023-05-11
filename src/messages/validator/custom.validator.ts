// import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

// @ValidatorConstraint({ name: 'customValidator', async: false })

// export class CustomValidator implements ValidatorConstraintInterface {
//     // it checks whether the value passed to it is equal to the string 'custom'
//     validate(content: any, args: ValidationArguments) {
//         //Add custom validation logic here
//         return content === 'Welcome';
//     }

//     //the error msg returned if the validation fails
//     defaultMessage(args: ValidationArguments) {
//         //define error msg here
//         return `value should be equal to 'Welcome'`;
//     }

// }