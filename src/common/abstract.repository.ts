import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { HandleMySqlError } from './helpers/handleMySqlError';

@Injectable()
export abstract class AbstractRepository {
  connectionDb: any;
  handleMySqlError: HandleMySqlError;

  constructor(
    protected readonly repo: Repository<any>,
    connection: Connection,
  ) {
    this.connectionDb = connection.createQueryRunner();
    this.handleMySqlError = new HandleMySqlError();
  }

  createInstance(instanceDetails) {
    return this.repo.create(instanceDetails);
  }

  async findAll(condition = {}) {
    return this.repo.find({
      where: condition ? condition : undefined,
    });
  }

  async findOne(condition) {
    return await this.repo.findOne({ where: condition });
  }

  async update(id, instance) {
    return await this.repo.update({ id }, { ...instance });
  }

  async save(instance) {
    return await this.repo.save(instance);
  }

  async remove(instances) {
    return await this.repo.delete(instances);
  }
}
