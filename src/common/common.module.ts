import { Module } from '@nestjs/common';

import { HandleError } from './helpers/handleError';

@Module({
  imports: [],
  providers: [HandleError],
  exports: [HandleError],
})
export class CommonModule {}
