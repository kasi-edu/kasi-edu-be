import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  randEmail,
  randPhoneNumber,
  randFirstName,
  randFullAddress,
} from '@ngneat/falso';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../src/user/user.module';
import { AuthModule } from '../src/auth/auth.module';
import { UserService } from '../src/user/user.service';
import { UserMock } from './userMock';

describe('User API', () => {
  const urlPath = '/users';
  let app: INestApplication;
  let userService: UserService;
  let userMockGlobal = null;
  let accessToken = null;

  const createPayload: CreateUserDto = {
    email: randEmail(),
    password: 'Password123',
    type: 'vocation',
    address: randFullAddress(),
    category: 'otomotif',
    description:
      'kami vokasi yang bergerak dibidang otomotif, mengajar dengan kurikulum yang sesuai dengan kebutuhan industry',
    contactPerson: randFirstName(),
    phoneOne: randPhoneNumber(),
    phoneTwo: randPhoneNumber(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.test` }),
        TypeOrmModule.forRoot({
          type: process.env.DB_TYPE as any,
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [__dirname + '/../**/*.entity.{js,ts}'],
          synchronize: true,
          ssl: true,
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
        }),
        UserModule,
        AuthModule, // ! for get token
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userService = moduleFixture.get<UserService>(UserService);

    userMockGlobal = new UserMock(app, userService);
    accessToken = await userMockGlobal.getAccessToken();
  });

  afterAll(async () => {
    await userMockGlobal.remove();
    await Promise.all([app.close()]);
  });

  describe('', () => {
    it('', () => {
      expect(1).toEqual(1);
    });
  });
});
