import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { VocationClass } from './entities/class.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassRepo } from './class.repository';
import { HandleError } from 'src/common/helpers/handleError';
import { UnitOfWorkFactory } from 'src/common/unit-of-work-factory';

@Module({
  imports: [TypeOrmModule.forFeature([VocationClass])],
  controllers: [ClassController],
  providers: [ClassService, ClassRepo, HandleError, UnitOfWorkFactory],
  exports: [ClassService],
})
export class ClassModule {}
