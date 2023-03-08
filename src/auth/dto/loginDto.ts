import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { randEmail } from '@ngneat/falso';

export class LoginDto {
  @ApiProperty({ example: randEmail({ length: 10 }) })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ example: 'Password12' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
