import { Injectable } from '@nestjs/common';
import { HandleMySqlError } from 'src/common/helpers/handleMySqlError';
import { UnitOfWorkFactory } from 'src/common/unit-of-work-factory';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepo } from './user.repository';

@Injectable()
export class UserService {
  private unitOfWorkFactory: UnitOfWorkFactory;

  constructor(
    private EntityManager: UnitOfWorkFactory,
    private repo: UserRepo,
    public handleMySqlError: HandleMySqlError,
  ) {
    this.unitOfWorkFactory = EntityManager;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.repo.createInstance({
        ...createUserDto,
      });
      await this.repo.save(user);

      return {
        message: 'success create a new user',
        data: createUserDto,
      };
    } catch (error) {
      this.handleMySqlError.throwError(error);
    }
  }

  async findAll() {
    try {
      const users = await this.repo.findAll();
      return {
        message: 'OK',
        data: users,
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.repo.update(id, updateUserDto);
      return {
        message: 'OK',
        data: updateUserDto,
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
