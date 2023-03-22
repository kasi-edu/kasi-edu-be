import {
  ConflictException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { MysqlErrorCodes } from 'mysql-error-codes';

@Injectable()
export class HandleError {
  throwError(error) {
    console.error('HandleError ', error);
    const errMessage = error.driverError?.sqlMessage || '';

    switch (error.driverError?.errno) {
      case MysqlErrorCodes.ER_DUP_ENTRY:
        throw new ConflictException(errMessage);

      default:
        throw new BadRequestException(error.message);
    }
  }
}
