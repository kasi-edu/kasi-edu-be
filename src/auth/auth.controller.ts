import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiExtraModels,
  refs,
} from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { ResponseSignInDto } from './dto/response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a new user for normal user & vocation' })
  @ApiOkResponse({ schema: { anyOf: refs(User) } })
  @ApiResponse({
    status: 400,
    schema: {
      anyOf: [
        {
          title: 'Email does not exist',
          example: {
            statusCode: 400,
            error: 'Bad Request',
            message: 'Email does not exist',
          },
        },
        {
          title: 'vocation need category / vocationName / vocationEmail',
          example: {
            statusCode: 400,
            error: 'Bad Request',
            message: 'vocation need category / vocationName / vocationEmail',
          },
        },
      ],
    },
  })
  async signup(@Body() createUserDto) {
    return await this.authService.signUp(createUserDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Create a new user for normal user & vocation' })
  @ApiOkResponse({ schema: { anyOf: refs(ResponseSignInDto) } })
  @ApiResponse({
    status: 400,
    schema: {
      anyOf: [
        {
          title: 'Email does not exist',
          example: {
            statusCode: 400,
            error: 'Bad Request',
            message: 'Email does not exist',
          },
        },
        {
          title: 'Password is incorrect',
          example: {
            statusCode: 400,
            error: 'Bad Request',
            message: 'Password is incorrect',
          },
        },
      ],
    },
  })
  async signin(@Body() data) {
    return await this.authService.signIn(data);
  }
}
