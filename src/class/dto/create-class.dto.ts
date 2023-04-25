import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({ example: 'Belajar memasak' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'memasak sushi dengan lengkap' })
  @IsString()
  description: string;

  @ApiProperty({ example: 250000 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: new Date(), description: 'tanggal buka registrasi untuk kelas' })
  @IsString()
  regisOpenDate: string;

  @ApiProperty({ example: new Date(), description: 'tanggal registrasi selesai untuk kelas' })
  @IsString()
  regisClosedDate: string;

  @ApiProperty({ example: new Date(), description: 'tanggal kelas ini dimulai' })
  @IsString()
  startDate: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  duration: number;

  @ApiProperty({ example: 'month / week' })
  @IsString()
  durationType: string;
}
