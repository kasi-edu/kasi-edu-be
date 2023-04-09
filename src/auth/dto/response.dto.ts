import { ApiProperty } from '@nestjs/swagger';
import { randSlug } from '@ngneat/falso';

export class ResponseTokenDto {
  @ApiProperty({ example: randSlug() })
  accessToken: string;
  @ApiProperty({ example: randSlug() })
  refreshToken: string;
}

export class ResponseSignInDto {
  @ApiProperty({ example: `Success login` })
  message: string;

  @ApiProperty({ type: ResponseTokenDto })
  data: {
    accessToken: ResponseTokenDto;
    refreshToken: ResponseTokenDto;
  };
}
