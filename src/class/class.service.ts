import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstract.service';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { HandleError } from 'src/common/helpers/handleError';
import { UnitOfWorkFactory } from 'src/common/unit-of-work-factory';
import { ClassRepo } from './class.repository';

@Injectable()
export class ClassService extends AbstractService {
  private unitOfWorkFactory: UnitOfWorkFactory;

  constructor(
    private EntityManager: UnitOfWorkFactory,
    private classRepo: ClassRepo,
    public handleError: HandleError,
  ) {
    super(classRepo, 'class');
    this.unitOfWorkFactory = EntityManager;
  }
}
