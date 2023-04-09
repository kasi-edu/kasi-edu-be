import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { AbstractService } from 'src/common/abstract.service';
import { HandleError } from 'src/common/helpers/handleError';
import { UnitOfWorkFactory } from 'src/common/unit-of-work-factory';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepo } from './user.repository';

@Injectable()
export class UserService extends AbstractService {
  private unitOfWorkFactory: UnitOfWorkFactory;

  constructor(
    private EntityManager: UnitOfWorkFactory,
    public handleError: HandleError,
    private userRepo: UserRepo,
    private categoryService: CategoryService,
  ) {
    super(userRepo, 'user');
    this.unitOfWorkFactory = EntityManager;
  }

  async findCategory(name: string) {
    const { data: matchedCategory } = await this.categoryService.findOne({
      conditions: { name },
    });

    if (!matchedCategory) {
      throw new BadRequestException('category not found');
    }

    return matchedCategory;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { category } = createUserDto;
      const matchedCategory = await this.findCategory(category);

      await this.userRepo.save({
        ...createUserDto,
        category: matchedCategory,
      });

      return {
        message: `success create a new user`,
        data: createUserDto,
      };
    } catch (error) {
      this.handleError.throwError(error);
    }
  }

  async update(id: number, updateDto) {
    try {
      const user = await this.userRepo.findOne({ conditions: { id } });

      const { category } = updateDto;
      if (category) {
        const matchedCategory = await this.findCategory(category);
        user.category = matchedCategory;
        delete updateDto.category;
      }

      await this.userRepo.update(id, {
        ...user,
        ...updateDto,
      });

      return {
        message: 'OK',
        data: updateDto,
      };
    } catch (error) {
      this.handleError.throwError(error);
    }
  }
}
