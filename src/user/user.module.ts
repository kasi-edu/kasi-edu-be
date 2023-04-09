import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HandleError } from 'src/common/helpers/handleError';
import { UnitOfWorkFactory } from 'src/common/unit-of-work-factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CommonModule } from 'src/common/common.module';
import { UserRepo } from './user.repository';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonModule, CategoryModule],
  controllers: [UserController],
  providers: [UserService, UserRepo, HandleError, UnitOfWorkFactory],
  exports: [UserService],
})
export class UserModule {}
