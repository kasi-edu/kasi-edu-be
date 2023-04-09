import { ApiProperty } from '@nestjs/swagger';
import { MetaResponseDto } from 'src/common/dto/meta-response.dto';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

export class PaginationResponseDto {
  @ApiProperty({ isArray: true, type: User })
  data: User;

  @ApiProperty({ type: MetaResponseDto })
  meta: {
    total: MetaResponseDto;
    page: MetaResponseDto;
    last_page: MetaResponseDto;
  };
}

export class ResponseUserPaginationDto {
  @ApiProperty({ example: `OK` })
  message: string;

  @ApiProperty({ type: PaginationResponseDto })
  data: {
    data: PaginationResponseDto;
    meta: PaginationResponseDto;
  };
}

export class ResponseUserDto {
  @ApiProperty({ example: `OK` })
  message: string;

  @ApiProperty({ type: User })
  data: { data: User };
}

export class ResponseCreateUserDto {
  @ApiProperty({ example: `success create a new user` })
  message: string;

  @ApiProperty({ type: CreateUserDto })
  data: { user: User };
}

export class ResponsePatchUserDto {
  @ApiProperty({ example: `OK` })
  message: string;

  @ApiProperty({ type: UpdateUserDto })
  data: { data: UpdateUserDto };
}
