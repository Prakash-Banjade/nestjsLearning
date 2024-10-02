import { Module } from '@nestjs/common';
import { EccService } from './ecc.service';
import { EccController } from './ecc.controller';
import { EccServiceV2 } from './ecc.service-v2';
import { EccServiceElliptic } from './ecc.service-elliptic';

@Module({
  providers: [EccService, EccServiceV2, EccServiceElliptic],
  controllers: [EccController]
})
export class EccModule {}
