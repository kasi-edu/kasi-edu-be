import { ApiProperty } from '@nestjs/swagger';

export class ResponseDeleteDto {
  @ApiProperty({ example: `OK` })
  message: string;

  @ApiProperty({ type: String, nullable: true, default: null })
  data: null;
}
