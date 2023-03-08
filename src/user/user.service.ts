import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstract.service';
import { HandleError } from 'src/common/helpers/handleError';
import { UnitOfWorkFactory } from 'src/common/unit-of-work-factory';
import { UserRepo } from './user.repository';

@Injectable()
export class UserService extends AbstractService {
  private unitOfWorkFactory: UnitOfWorkFactory;

  constructor(
    private EntityManager: UnitOfWorkFactory,
    private userRepo: UserRepo,
    public handleError: HandleError,
  ) {
    super(userRepo, 'user');
    this.unitOfWorkFactory = EntityManager;
  }
}
