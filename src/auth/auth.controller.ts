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
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { ResponseSignInDto } from './dto/response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a new user for normal user & vocation' })
  @ApiExtraModels(LoginDto)
  @ApiOkResponse({ schema: { anyOf: refs(LoginDto) } })
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
          description: `The supplier couldn't be found in our system, please verify and try again.`,
          example: {
            statusCode: 400,
            error: 'Bad Request',
            message: 'Account not verified',
          },
        },
        {
          title: 'Password is incorrect',
          description: `The information provided couldn't be found in the part numbers master, please verify and try again.`,
          example: {
            statusCode: 400,
            error: 'Bad Request',
            message: 'Password is incorrect',
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
