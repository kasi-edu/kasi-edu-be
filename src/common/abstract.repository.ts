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

  async findAll({
    conditions = {},
    relations = {},
    select = {},
    page = 1,
    take = 0,
  }) {
    const [data, total] = await this.repo.findAndCount({
      take,
      skip: (page - 1) * take, // offset
      where: conditions ? conditions : undefined,
      relations: relations ? relations : undefined,
      select: select ? select : undefined,
    });

    return {
      data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async findOne({ conditions = {}, relations = {}, select = {} }) {
    return await this.repo.findOne({
      where: conditions ? conditions : undefined,
      relations: relations ? relations : undefined,
      select: select ? select : undefined,
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
