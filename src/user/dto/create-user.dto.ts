import { ApiProperty } from '@nestjs/swagger';
import {
  randEmail,
  randFirstName,
  randFullAddress,
  randPhoneNumber,
} from '@ngneat/falso';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: randEmail(),
    description: 'Primary email for user & vocation register',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: randEmail(),
    description: 'Secondary email for vocation register',
  })
  @IsEmail()
  @IsOptional()
  vocationEmail: string;

  @ApiProperty({ example: 'Password12', description: 'Password for register' })
  @IsString()
  @MinLength(4, { message: 'Password must be at least 4 characters' })
  @MaxLength(12, { message: 'Password to long' })
  @Matches(/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))/, {
    message: 'password too weak, upper and lower case letters and a number',
  })
  password: string;

  @ApiProperty({
    example: 'vocation',
    description: 'a user type, is a normal user or vocation',
  })
  @IsString()
  type: string;

  @ApiProperty({
    example: randFullAddress(),
    description: 'a full address location for user & vocation',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: 'kami vokasi yang bergerak dibidang otomotif',
    description: 'A long description for tell about user & vocations',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 'otomotif',
    description: 'the category type for user & vocation',
  })
  @IsString()
  category: string;

  @ApiProperty({
    example: randFirstName(),
    description: 'A contact person for vocation',
  })
  @IsString()
  @IsOptional()
  contactPerson: string;

  @ApiProperty({
    example: randPhoneNumber(),
    description: 'The primary phone number for user & vocation',
  })
  @IsPhoneNumber('ID', {
    message: 'Invalid phone number. Valid phone number sample +6247063644568',
  })
  phoneOne: string;

  @ApiProperty({
    example: randPhoneNumber(),
    description:
      'The secondary phone number for user & vocation, this is optional',
  })
  @IsPhoneNumber('ID', {
    message: 'Invalid phone number. Valid phone number sample +6247063644568',
  })
  @IsOptional()
  phoneTwo: string;
}
