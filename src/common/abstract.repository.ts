import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { HandleError } from './helpers/handleError';

@Injectable()
export abstract class AbstractRepository {
  connectionDb: any;
  handleError: HandleError;

  constructor(
    protected readonly repo: Repository<any>,
    connection: Connection,
  ) {
    this.connectionDb = connection.createQueryRunner();
    this.handleError = new HandleError();
  }

  async createInstance(instanceDetails) {
    return await this.repo.create(instanceDetails);
  }

  async findAll({ conditions = {}, relations = {} }) {
    return this.repo.find({
      where: conditions ? conditions : undefined,
      relations: relations ? relations : undefined,
    });
  }

  async findOne({ conditions = {}, relations = {} }) {
    return await this.repo.findOne({
      where: conditions ? conditions : undefined,
      relations: relations ? relations : undefined,
    });
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
