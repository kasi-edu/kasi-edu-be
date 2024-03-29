import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { HandleError } from 'src/common/helpers/handleError';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/loginDto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    public handleError: HandleError,
  ) {}

  hashData(data: string) {
    return bcrypt.hash(data, 8);
  }

  checkVocationMandatoryField(createUserDto: CreateUserDto) {
    console.log({
      vocationEmail: typeof createUserDto['vocationEmail'],
      vocationName: typeof createUserDto['vocationName'],
      category: typeof createUserDto['category'],
    });

    const checkField = ['vocationEmail', 'vocationName', 'category'].every(
      (fieldName) => typeof createUserDto[fieldName] !== 'undefined',
    );

    if (!checkField) {
      throw new BadRequestException(
        'vocation need category / vocationName / vocationEmail',
      );
    }
  }

  async signIn(data: LoginDto) {
    try {
      const { email, password: inputPassword } = data;

      const { data: userDetails } = await this.userService.findOne({
        conditions: { email },
      });
      if (!userDetails) {
        throw new BadRequestException('Email does not exist');
      }

      const hash = await bcrypt.hash(inputPassword, 8);
      const passwordMatches = bcrypt.compare(userDetails.password, hash);

      if (!passwordMatches) {
        throw new BadRequestException('Password is incorrect');
      }

      return {
        message: `Success login`,
        data: await this.updateToken(userDetails),
      };
    } catch (error) {
      this.handleError.throwError(error);
    }
  }

  async signUp(createUserDto): Promise<any> {
    try {
      const { email, password, type } = createUserDto;

      if (type === 'vocation') {
        this.checkVocationMandatoryField(createUserDto);
      }

      const { data: existingUserDetails } = await this.userService.findOne({
        conditions: { email },
      });

      if (existingUserDetails) {
        throw new BadRequestException('Email is registered');
      }

      await this.userService.create({
        ...createUserDto,
        password: await this.hashData(password),
      });

      return {
        message: `Success created a new user`,
        data: createUserDto,
      };
    } catch (error) {
      this.handleError.throwError(error);
    }
  }

  async updateToken(userDetails) {
    delete userDetails.password;

    const tokens = await this.getTokens(userDetails);
    await this.updateRefreshToken(userDetails.id, tokens.refreshToken);

    return tokens;
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userDetails) {
    const sub = userDetails.id;
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub, userDetails },
        {
          secret: process.env.SECRET,
          expiresIn: process.env.TOKEN_EXP,
        },
      ),
      this.jwtService.signAsync(
        { sub, userDetails },
        {
          secret: process.env.SECRET_REFRES,
          expiresIn: process.env.TOKEN_REFRESH_EXP,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
