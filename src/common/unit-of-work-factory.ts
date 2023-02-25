import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UnitOfWork } from './unit-of-work';

@Injectable()
export class UnitOfWorkFactory {
  private conn: Connection;

  constructor(conn: Connection) {
    this.conn = conn;
  }

  use(): UnitOfWork {
    return new UnitOfWork(this.conn.createQueryRunner(), this.conn);
  }
}
