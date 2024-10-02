import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EccModule } from './ecc/ecc.module';
import { RsaModule } from './rsa/rsa.module';

@Module({
  imports: [EccModule, RsaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
