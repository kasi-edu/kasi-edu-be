import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

import {
  ResponseCreateUserDto,
  ResponsePatchUserDto,
  ResponseUserDto,
  ResponseUserPaginationDto,
} from './dto/response.dto';
import { ResponseDeleteDto } from 'src/common/dto/delete-response.dto';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@UseGuards(AccessTokenGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'save new employee' })
  @ApiResponse({ type: ResponseCreateUserDto, status: 201 })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all employee' })
  @ApiQuery({ name: 'page', example: 1, required: false })
  @ApiQuery({ name: 'take', example: 5, required: false })
  @ApiResponse({ type: ResponseUserPaginationDto, status: 200 })
  findAll(@Query('page') page = 1, @Query('take') take = 0) {
    return this.userService.findAll({
      page,
      take,
      relations: ['category'],
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'get employee details by id' })
  @ApiParam({ name: 'id', example: 5, description: 'the user id' })
  @ApiResponse({ type: ResponseUserDto, status: 200 })
  findOne(@Param('id') id: string) {
    return this.userService.findOne({
      conditions: { id },
      relations: ['category'],
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update the specific employee data by id' })
  @ApiParam({ name: 'id', example: 5, description: 'the user id' })
  @ApiResponse({ type: ResponsePatchUserDto, status: 200 })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete the specific employee data by id' })
  @ApiParam({ name: 'id', example: 5, description: 'the user id' })
  @ApiResponse({ type: ResponseDeleteDto, status: 200 })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
