import { ConflictException, Injectable } from '@nestjs/common';
import { MysqlErrorCodes } from 'mysql-error-codes';

@Injectable()
export class HandleMySqlError {
  throwError(error) {
    console.error('HandleMySqlError ', error);
    const errMessage = error.driverError.sqlMessage || '';

    switch (error.driverError.errno) {
      case MysqlErrorCodes.ER_DUP_ENTRY:
        throw new ConflictException(errMessage);

      default:
        throw new ConflictException('banggg');
    }
  }
}
