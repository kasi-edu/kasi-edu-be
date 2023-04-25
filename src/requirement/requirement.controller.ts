import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RequirementService } from './requirement.service';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';

@Controller('requirements')
export class RequirementController {
  constructor(private readonly requirementService: RequirementService) {}

  @Post()
  create(@Body() createRequirementDto: CreateRequirementDto) {
    return this.requirementService.create(createRequirementDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    const { page, take } = pageOptionsDto;
    return this.requirementService.findAll({
      page,
      take,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requirementService.findOne({
      conditions: { id },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequirementDto: UpdateRequirementDto) {
    return this.requirementService.update(+id, updateRequirementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requirementService.remove(+id);
  }
}
