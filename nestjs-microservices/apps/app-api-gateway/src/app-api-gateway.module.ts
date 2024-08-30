import { Module } from '@nestjs/common';
import { AppApiGatewayController } from './app-api-gateway.controller';
import { AppApiGatewayService } from './app-api-gateway.service';

@Module({
  imports: [],
  controllers: [AppApiGatewayController],
  providers: [AppApiGatewayService],
})
export class AppApiGatewayModule {}
