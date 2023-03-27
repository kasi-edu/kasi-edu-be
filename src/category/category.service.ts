import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstract.service';
import { HandleError } from 'src/common/helpers/handleError';
import { UnitOfWorkFactory } from 'src/common/unit-of-work-factory';
import { CategoryRepo } from './category.repository';

@Injectable()
export class CategoryService extends AbstractService {
  private unitOfWorkFactory: UnitOfWorkFactory;

  constructor(
    private EntityManager: UnitOfWorkFactory,
    private categoryRepo: CategoryRepo,
    public handleError: HandleError,
  ) {
    super(categoryRepo, 'category');
    this.unitOfWorkFactory = EntityManager;
  }
}
