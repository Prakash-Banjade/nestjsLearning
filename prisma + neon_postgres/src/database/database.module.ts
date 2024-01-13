import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

// @Global // we can do this for large project where same exports are required but minimize its use
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
