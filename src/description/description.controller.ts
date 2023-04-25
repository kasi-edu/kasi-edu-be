import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { DescriptionService } from './description.service';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';

@Controller('descriptions')
export class DescriptionController {
  constructor(private readonly descriptionService: DescriptionService) {}

  @Post()
  create(@Body() createDescriptionDto: CreateDescriptionDto) {
    return this.descriptionService.create(createDescriptionDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    const { page, take } = pageOptionsDto;
    return this.descriptionService.findAll({
      page,
      take,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.descriptionService.findOne({
      conditions: { id },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDescriptionDto: UpdateDescriptionDto) {
    return this.descriptionService.update(+id, updateDescriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.descriptionService.remove(+id);
  }
}
