import { ApiProperty } from '@nestjs/swagger';

export class MetaResponseDto {
  @ApiProperty({ example: 55 })
  total: number;
  @ApiProperty({ example: 1 })
  page: number;
  @ApiProperty({ example: 2 })
  last_page: number;
}
