import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { AbstractRepository } from 'src/common/abstract.repository';
import { Requirement } from './entities/requirement.entity';

@Injectable()
export class RequirementRepo extends AbstractRepository {
  constructor(
    @InjectRepository(Requirement)
    readonly repo: Repository<Requirement>,
    connection: Connection,
  ) {
    super(repo, connection);
  }
}
