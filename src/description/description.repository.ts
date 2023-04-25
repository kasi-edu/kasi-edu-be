import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { AbstractRepository } from 'src/common/abstract.repository';
import { Description } from './entities/description.entity';

@Injectable()
export class DescriptionRepo extends AbstractRepository {
  constructor(
    @InjectRepository(Description)
    readonly repo: Repository<Description>,
    connection: Connection,
  ) {
    super(repo, connection);
  }
}
