import { Module } from '@nestjs/common';

import { HandleMySqlError } from './helpers/handleMySqlError';

@Module({
  imports: [],
  providers: [HandleMySqlError],
  exports: [HandleMySqlError],
})
export class CommonModule {}
