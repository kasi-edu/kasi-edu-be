import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    const { page, take } = pageOptionsDto;
    return this.classService.findAll({
      page,
      take,
      relations: ['descriptions', 'requirements'],
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne({ conditions: { id }, relations: ['descriptions', 'requirements'] });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(+id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(+id);
  }
}
