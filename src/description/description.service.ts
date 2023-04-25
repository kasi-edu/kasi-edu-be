import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstract.service';
import { HandleError } from 'src/common/helpers/handleError';
import { UnitOfWorkFactory } from 'src/common/unit-of-work-factory';
import { DescriptionRepo } from './description.repository';

@Injectable()
export class DescriptionService extends AbstractService {
  private unitOfWorkFactory: UnitOfWorkFactory;

  constructor(
    private EntityManager: UnitOfWorkFactory,
    private descriptionRepo: DescriptionRepo,
    public handleError: HandleError,
  ) {
    super(descriptionRepo, 'description');
    this.unitOfWorkFactory = EntityManager;
  }
}
