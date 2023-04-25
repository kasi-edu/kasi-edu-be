import { Injectable } from '@nestjs/common';
import { PageMetaDto } from './dto/page-meta.dto';
import { PageDto } from './dto/page.dto';
import { HandleError } from './helpers/handleError';

@Injectable()
export abstract class AbstractService {
  public handleError: HandleError;

  constructor(private repo, private serviceName) {
    this.handleError = new HandleError();
  }

  async upsert(data, target) {
    try {
      const existingData = await this.repo.findOne(target);

      const dataInstance = await this.repo.createInstance({
        ...(existingData !== null && { id: existingData.id }),
        ...data,
      });

      await this.repo.save(dataInstance);
      return {
        message: `success create a new ${this.serviceName}`,
        data: existingData,
      };
    } catch (error) {
      this.handleError.throwError(error);
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
      this.handleError.throwError(error);
    }
  }

  async findAll({ conditions = {}, relations = {}, select = {}, page = 1, take = 0 }) {
    try {
      const [data, itemCount] = await this.repo.findAll({
        take,
        page,
        relations,
        select,
        conditions,
      });

      const pageMetaDto = new PageMetaDto({
        itemCount,
        pageOptionsDto: { page, take },
      });

      return new PageDto(data, pageMetaDto);
    } catch (error) {
      this.handleError.throwError(error);
    }
  }

  async findOne({ conditions = {}, relations = {}, select = {} }) {
    try {
      return {
        message: 'OK',
        data: await this.repo.findOne({ conditions, relations, select }),
      };
    } catch (error) {
      this.handleError.throwError(error);
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
      this.handleError.throwError(error);
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
      this.handleError.throwError(error);
    }
  }
}
