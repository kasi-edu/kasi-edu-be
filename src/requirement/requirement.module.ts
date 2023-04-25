import { Module } from '@nestjs/common';
import { RequirementService } from './requirement.service';
import { RequirementController } from './requirement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requirement } from './entities/requirement.entity';
import { RequirementRepo } from './requirement.repository';
import { UnitOfWorkFactory } from 'src/common/unit-of-work-factory';
import { HandleError } from 'src/common/helpers/handleError';

@Module({
  imports: [TypeOrmModule.forFeature([Requirement])],
  controllers: [RequirementController],
  providers: [RequirementService, RequirementRepo, UnitOfWorkFactory, HandleError],
  exports: [RequirementService],
})
export class RequirementModule {}
