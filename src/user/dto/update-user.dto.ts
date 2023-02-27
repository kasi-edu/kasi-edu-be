import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  contactPerson?: string;

  @IsPhoneNumber('ID', {
    message: 'Invalid phone number. Valid phone number sample +6247063644568',
  })
  @IsOptional()
  phoneOne?: string;

  @IsPhoneNumber('ID', {
    message: 'Invalid phone number. Valid phone number sample +6247063644568',
  })
  @IsOptional()
  phoneTwo?: string;
}
