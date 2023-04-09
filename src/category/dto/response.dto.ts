import { ApiProperty } from '@nestjs/swagger';
import { MetaResponseDto } from 'src/common/dto/meta-response.dto';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './update-category.dto';

export class PaginationResponseDto {
  @ApiProperty({ isArray: true, type: Category })
  data: Category;

  @ApiProperty({ type: MetaResponseDto })
  meta: {
    total: MetaResponseDto;
    page: MetaResponseDto;
    last_page: MetaResponseDto;
  };
}

export class ResponseCategoryPaginationDto {
  @ApiProperty({ example: `OK` })
  message: string;

  @ApiProperty({ type: PaginationResponseDto })
  data: {
    data: PaginationResponseDto;
    meta: PaginationResponseDto;
  };
}

export class ResponseCategoryDto {
  @ApiProperty({ example: `OK` })
  message: string;

  @ApiProperty({ type: Category })
  data: { data: Category };
}

export class ResponseCreateCategoryDto {
  @ApiProperty({ example: `success create a new category` })
  message: string;

  @ApiProperty({ type: CreateCategoryDto })
  data: { user: Category };
}

export class ResponsePatchCategoryDto {
  @ApiProperty({ example: `OK` })
  message: string;

  @ApiProperty({ type: UpdateCategoryDto })
  data: { data: UpdateCategoryDto };
}
