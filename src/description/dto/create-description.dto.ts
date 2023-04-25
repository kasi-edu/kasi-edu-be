import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDescriptionDto {
  @ApiProperty({ example: 'Belajar memasak' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'memasak sushi dengan lengkap' })
  @IsString()
  description: string;
}
