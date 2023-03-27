import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { AbstractRepository } from 'src/common/abstract.repository';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryRepo extends AbstractRepository {
  constructor(
    @InjectRepository(Category) readonly repo: Repository<Category>,
    connection: Connection,
  ) {
    super(repo, connection);
  }
}
