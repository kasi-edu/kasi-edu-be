import { Injectable } from '@nestjs/common';
import { CategoryRepo } from 'src/category/category.repository';
import { User } from 'src/user/entities/user.entity';
import { UserRepo } from 'src/user/user.repository';

import { EntityManager, QueryRunner, Repository, Connection } from 'typeorm';

@Injectable()
export class UnitOfWork {
  private transactionManager: EntityManager;
  public connection: Connection;

  public userRepo: UserRepo;
  public categoryRepo: CategoryRepo;

  constructor(
    private readonly queryRunner: QueryRunner,
    connection: Connection,
  ) {
    this.transactionManager = this.queryRunner.manager;

    // * add every repo in here
    this.userRepo = new UserRepo(
      this.transactionManager.getRepository(User),
      connection,
    );
  }

  async start(): Promise<void> {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  async commit(): Promise<void> {
    await this.queryRunner.commitTransaction();
    await this.queryRunner.release();
  }

  async rollback(): Promise<void> {
    await this.queryRunner.rollbackTransaction();
    await this.queryRunner.release();
  }

  async release(): Promise<void> {
    await this.queryRunner.release();
  }
}
