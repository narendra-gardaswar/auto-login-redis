import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Passwords must contain at least 1 upper case, 1 lower case letter, 1 number or special character',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(\+?\d{1,3}|\d{1,4})$/, {
    message: 'provide a valid country code',
  })
  countryCode: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 11)
  mobileNumber: string;
}

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
