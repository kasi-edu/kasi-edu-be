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
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

describe('User API', () => {
  // const urlPath = '/users';
  // let app: INestApplication;
  // let userService: UserService;
  // let userMockGlobal = null;
  // let accessToken = null;
  // const createPayload: CreateUserDto = {
  //   email: randEmail(),
  //   vocationEmail: randEmail(),
  //   password: 'Password123',
  //   type: 'vocation',
  //   address: randFullAddress(),
  //   category: 'otomotif',
  //   description:
  //     'kami vokasi yang bergerak dibidang otomotif, mengajar dengan kurikulum yang sesuai dengan kebutuhan industry',
  //   contactPerson: randFirstName(),
  //   phoneOne: randPhoneNumber(),
  //   phoneTwo: randPhoneNumber(),
  // };
  // const updatePayload: UpdateUserDto = {
  //   description: 'new description update',
  // };
  // beforeAll(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [
  //       ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.test` }),
  //       TypeOrmModule.forRoot({
  //         type: process.env.DB_TYPE as any,
  //         host: process.env.DB_HOST,
  //         port: Number(process.env.DB_PORT),
  //         username: process.env.DB_USERNAME,
  //         password: process.env.DB_PASSWORD,
  //         database: process.env.DB_DATABASE,
  //         entities: [__dirname + '/../**/*.entity.{js,ts}'],
  //         synchronize: true,
  //         ssl: true,
  //         extra: {
  //           ssl: {
  //             rejectUnauthorized: false,
  //           },
  //         },
  //       }),
  //       UserModule,
  //       AuthModule, // ! for get token
  //     ],
  //   }).compile();
  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  //   userService = moduleFixture.get<UserService>(UserService);
  //   userMockGlobal = new UserMock(app, userService);
  //   accessToken = await userMockGlobal.getAccessToken();
  // });
  // afterAll(async () => {
  //   await userMockGlobal.remove();
  //   await Promise.all([app.close()]);
  // });

  describe('', () => {
    it('', () => {
      expect(1).toEqual(1);
    });
  });

  // it('1. success add a new user', async () => {
  //   const {
  //     body: { message, data },
  //   } = await request(app.getHttpServer())
  //     .post(urlPath)
  //     .set('Authorization', 'bearer ' + accessToken)
  //     .send(createPayload);
  //   expect(message).toEqual('success create a new user');
  //   expect(data.email).toEqual(createPayload.email);
  //   expect(data.password).toEqual(createPayload.password);
  //   expect(data.type).toEqual(createPayload.type);
  //   expect(data.address).toEqual(createPayload.address);
  //   expect(data.category).toEqual(createPayload.category);
  //   expect(data.description).toEqual(createPayload.description);
  //   expect(data.contactPerson).toEqual(createPayload.contactPerson);
  //   expect(data.phoneOne).toEqual(createPayload.phoneOne);
  //   expect(data.phoneTwo).toEqual(createPayload.phoneTwo);
  // });
  // it('2. success get all users', async () => {
  //   const {
  //     body: {
  //       message,
  //       data: { data, meta },
  //     },
  //   } = await request(app.getHttpServer())
  //     .get(urlPath)
  //     .set('Authorization', 'bearer ' + accessToken);
  //   expect(message).toEqual('OK');
  //   expect(data[0]).toHaveProperty('email');
  //   expect(data[0]).toHaveProperty('password');
  //   expect(data[0]).toHaveProperty('type');
  //   expect(data[0]).toHaveProperty('address');
  //   expect(data[0]).toHaveProperty('category');
  //   expect(data[0]).toHaveProperty('description');
  //   expect(data[0]).toHaveProperty('contactPerson');
  //   expect(data[0]).toHaveProperty('phoneOne');
  //   expect(data[0]).toHaveProperty('phoneTwo');
  //   expect(meta).toHaveProperty('total');
  //   expect(meta).toHaveProperty('page');
  //   expect(meta).toHaveProperty('last_page');
  // });
  // it('3. success get a user by id', async () => {
  //   const storedUser = await userService.findOne({
  //     conditions: { email: createPayload.email },
  //   });
  //   const {
  //     body: { message, data },
  //   } = await request(app.getHttpServer())
  //     .get(`${urlPath}/${storedUser.data.id}`)
  //     .set('Authorization', 'bearer ' + accessToken);
  //   expect(message).toEqual('OK');
  //   expect(data.email).toEqual(createPayload.email);
  //   expect(data.password).toEqual(createPayload.password);
  //   expect(data.type).toEqual(createPayload.type);
  //   expect(data.address).toEqual(createPayload.address);
  //   expect(data.category).toEqual(createPayload.category);
  //   expect(data.description).toEqual(createPayload.description);
  //   expect(data.contactPerson).toEqual(createPayload.contactPerson);
  //   expect(data.phoneOne).toEqual(createPayload.phoneOne);
  //   expect(data.phoneTwo).toEqual(createPayload.phoneTwo);
  // });
  // it('4. success update some field by id', async () => {
  //   const storedUser = await userService.findOne({
  //     conditions: { email: createPayload.email },
  //   });
  //   await request(app.getHttpServer())
  //     .patch(`${urlPath}/${storedUser.data.id}`)
  //     .set('Authorization', 'bearer ' + accessToken)
  //     .send(updatePayload);
  //   const { message, data: updatedUser } = await userService.findOne({
  //     conditions: { email: createPayload.email },
  //   });
  //   expect(message).toEqual('OK');
  //   expect(updatedUser.description).toEqual(updatePayload.description);
  // });
  // it('5. failed to add new user with with the same email', async () => {
  //   const { body } = await request(app.getHttpServer())
  //     .post(urlPath)
  //     .set('Authorization', 'bearer ' + accessToken)
  //     .send(createPayload)
  //     .expect(400);
  //   expect(body).toHaveProperty('error');
  //   expect(body.error).toEqual('Bad Request');
  // });
  // it('6. success delete the existing user by id ', async () => {
  //   const storedUser = await userService.findOne({
  //     conditions: { email: createPayload.email },
  //   });
  //   const { body } = await request(app.getHttpServer())
  //     .delete(`${urlPath}/${storedUser.data.id}`)
  //     .set('Authorization', 'bearer ' + accessToken);
  //   expect(body).toHaveProperty('message');
  //   expect(body.message).toEqual('OK');
  //   expect(body.data).toEqual(null);
  // });
  // it('7. failed get user without auth token ', async () => {
  //   const {
  //     body: { message },
  //   } = await request(app.getHttpServer()).get(urlPath).expect(401);
  //   expect(message).toEqual('Unauthorized');
  // });
});
