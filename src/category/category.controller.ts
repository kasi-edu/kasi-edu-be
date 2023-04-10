import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  ResponseCategoryDto,
  ResponseCategoryPaginationDto,
  ResponseCreateCategoryDto,
  ResponsePatchCategoryDto,
} from './dto/response.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  selectedColumn: any;

  constructor(private readonly categoryService: CategoryService) {
    this.selectedColumn = { id: true, name: true };
  }

  @Post()
  @ApiOperation({ summary: 'save new category' })
  @ApiResponse({ type: ResponseCreateCategoryDto, status: 201 })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all category' })
  @ApiQuery({ name: 'page', example: 1, required: false })
  @ApiQuery({ name: 'take', example: 5, required: false })
  @ApiResponse({ type: ResponseCategoryPaginationDto, status: 200 })
  findAll(@Query('page') page = 1, @Query('take') take = 0) {
    return this.categoryService.findAll({
      page,
      take,
      select: this.selectedColumn,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'get category details by id' })
  @ApiParam({ name: 'id', example: 5, description: 'the user id' })
  @ApiResponse({ type: ResponseCategoryDto, status: 200 })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne({
      conditions: { id },
      select: this.selectedColumn,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update the specific category data by id' })
  @ApiParam({ name: 'id', example: 5, description: 'the user id' })
  @ApiResponse({ type: ResponsePatchCategoryDto, status: 200 })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete the specific category data by id' })
  @ApiParam({ name: 'id', example: 5, description: 'the user id' })
  @ApiResponse({ type: ResponseCategoryDto, status: 200 })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
