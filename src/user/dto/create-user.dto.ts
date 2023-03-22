import { ApiProperty } from '@nestjs/swagger';
import {
  randEmail,
  randFirstName,
  randFullAddress,
  randPhoneNumber,
} from '@ngneat/falso';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: randEmail({ length: 10 }) })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password12' })
  @IsString()
  @MinLength(4, { message: 'Password must be at least 4 characters' })
  @MaxLength(12, { message: 'Password to long' })
  @Matches(/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))/, {
    message: 'password too weak, upper and lower case letters and a number',
  })
  password: string;

  @ApiProperty({ example: 'vocation' })
  @IsString()
  type: string;

  @ApiProperty({ example: randFullAddress() })
  @IsString()
  address: string;

  @ApiProperty({ example: 'kami vokasi yang bergerak dibidang otomotif' })
  @IsString()
  description?: string;

  @ApiProperty({ example: 'otomotif' })
  @IsString()
  category?: string;

  @ApiProperty({ example: randFirstName() })
  @IsString()
  contactPerson: string;

  @ApiProperty({ example: randPhoneNumber({ length: 10 }) })
  @IsPhoneNumber('ID', {
    message: 'Invalid phone number. Valid phone number sample +6247063644568',
  })
  phoneOne: string;

  @ApiProperty({ example: randPhoneNumber({ length: 10 }) })
  @IsPhoneNumber('ID', {
    message: 'Invalid phone number. Valid phone number sample +6247063644568',
  })
  phoneTwo?: string;
}
