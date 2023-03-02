import { Injectable } from '@nestjs/common';
import { HandleMySqlError } from './helpers/handleMySqlError';

@Injectable()
export abstract class AbstractService {
  public handleMySqlError: HandleMySqlError;

  constructor(private repo, private serviceName) {
    this.handleMySqlError = new HandleMySqlError();
  }

  async upsert(data, target) {
    try {
      const existingData = await this.repo.findOne(target);

      const dataInstance = await this.repo.createInstance({
        ...(existingData !== null && { id: existingData.id }),
        ...data,
      });
      console.log(
        '🚀 ~ file: abstract.service.ts:20 ~ AbstractService ~ upsert ~ dataInstance:',
        dataInstance,
      );
      await this.repo.save(dataInstance);
      return {
        message: `success create a new ${this.serviceName}`,
        data: existingData,
      };
    } catch (error) {
      this.handleMySqlError.throwError(error);
    }
  }

  async create(createDto) {
    try {
      const data = await this.repo.createInstance({
        ...createDto,
      });
      await this.repo.save(data);

      return {
        message: `success create a new ${this.serviceName}`,
        data: createDto,
      };
    } catch (error) {
      this.handleMySqlError.throwError(error);
    }
  }

  async findAll() {
    try {
      return {
        message: 'OK',
        data: await this.repo.findAll(),
      };
    } catch (error) {
      this.handleMySqlError.throwError(error);
    }
  }

  async findOne(condition) {
    try {
      return {
        message: 'OK',
        data: await this.repo.findOne(condition),
      };
    } catch (error) {
      this.handleMySqlError.throwError(error);
    }
  }

  async findOneById(id: number) {
    try {
      return {
        message: 'OK',
        data: await this.repo.findOne({ id }),
      };
    } catch (error) {
      this.handleMySqlError.throwError(error);
    }
  }

  async update(id: number, updateDto) {
    try {
      await this.repo.update(id, updateDto);
      return {
        message: 'OK',
        data: updateDto,
      };
    } catch (error) {
      this.handleMySqlError.throwError(error);
    }
  }

  async remove(id: number) {
    try {
      await this.repo.remove({ id });
      return {
        message: 'OK',
        data: null,
      };
    } catch (error) {
      this.handleMySqlError.throwError(error);
    }
  }
}
