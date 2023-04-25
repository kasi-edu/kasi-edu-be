import { Module } from '@nestjs/common';
import { DescriptionService } from './description.service';
import { DescriptionController } from './description.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Description } from './entities/description.entity';
import { DescriptionRepo } from './description.repository';
import { UnitOfWorkFactory } from 'src/common/unit-of-work-factory';
import { HandleError } from 'src/common/helpers/handleError';

@Module({
  imports: [TypeOrmModule.forFeature([Description])],
  controllers: [DescriptionController],
  providers: [DescriptionService, DescriptionRepo, UnitOfWorkFactory, HandleError],
  exports: [DescriptionService],
})
export class DescriptionModule {}
