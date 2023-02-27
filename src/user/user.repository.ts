import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { AbstractRepository } from 'src/common/abstract.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepo extends AbstractRepository {
  constructor(
    @InjectRepository(User) readonly repo: Repository<User>,
    connection: Connection,
  ) {
    super(repo, connection);
  }
}
