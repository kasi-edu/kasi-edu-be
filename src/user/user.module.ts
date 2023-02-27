import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HandleMySqlError } from 'src/common/helpers/handleMySqlError';
import { UnitOfWorkFactory } from 'src/common/unit-of-work-factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CommonModule } from 'src/common/common.module';
import { UserRepo } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonModule],
  controllers: [UserController],
  providers: [UserService, UserRepo, HandleMySqlError, UnitOfWorkFactory],
  exports: [UserService],
})
export class UserModule {}
