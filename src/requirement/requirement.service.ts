import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstract.service';
import { HandleError } from 'src/common/helpers/handleError';
import { UnitOfWorkFactory } from 'src/common/unit-of-work-factory';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { RequirementRepo } from './requirement.repository';

@Injectable()
export class RequirementService extends AbstractService {
  private unitOfWorkFactory: UnitOfWorkFactory;

  constructor(
    private EntityManager: UnitOfWorkFactory,
    private requirementRepo: RequirementRepo,
    public handleError: HandleError,
  ) {
    super(requirementRepo, 'requirement');
    this.unitOfWorkFactory = EntityManager;
  }
}
