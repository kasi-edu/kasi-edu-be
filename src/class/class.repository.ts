import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { AbstractRepository } from 'src/common/abstract.repository';
import { VocationClass } from './entities/class.entity';

@Injectable()
export class ClassRepo extends AbstractRepository {
  constructor(
    @InjectRepository(VocationClass) readonly repo: Repository<VocationClass>,
    connection: Connection,
  ) {
    super(repo, connection);
  }
}
