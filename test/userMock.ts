import * as request from 'supertest';
import {
  randEmail,
  randPhoneNumber,
  randFirstName,
  randFullAddress,
} from '@ngneat/falso';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class UserMock {
  urlPath: string;
  email: string;
  password: string;
  app: any;
  userDetails: User;
  userService: UserService;

  constructor(app, userService) {
    this.app = app;
    this.userService = userService;
    this.urlPath = '/auth';
    this.email = randEmail();
    this.password = 'Dummy_Tikus123';
    this.userDetails = null;
  }

  async getAccessToken() {
    await this.signUp();
    const body = await this.signIn();
    return body.accessToken;
  }

  generateUser() {
    const userMock: CreateUserDto = {
      email: this.email,
      password: this.password,
      type: 'vocation',
      address: randFullAddress(),
      category: 'otomotif',
      description:
        'kami vokasi yang bergerak dibidang otomotif, mengajar dengan kurikulum yang sesuai dengan kebutuhan industry',
      contactPerson: randFirstName(),
      phoneOne: randPhoneNumber(),
      phoneTwo: randPhoneNumber(),
    };

    return userMock;
  }

  async signUp() {
    try {
      const signUpPayload = this.generateUser();
      const { body } = await request(this.app.getHttpServer())
        .post(`${this.urlPath}/signup`)
        .send(signUpPayload);

      return body.data;
    } catch (error) {
      console.log(error);
    }
  }

  async signIn() {
    try {
      const { body } = await request(this.app.getHttpServer())
        .post(`${this.urlPath}/signin`)
        .send({ email: this.email, password: this.password });

      const { data: userDetails } = await this.userService.findOne({
        conditions: { email: this.email },
      });
      this.userDetails = userDetails;

      return body.data;
    } catch (error) {
      console.log(error);
    }
  }

  async remove() {
    try {
      await this.userService.remove(this.userDetails.id);
    } catch (error) {
      console.log(error);
    }
  }
}
