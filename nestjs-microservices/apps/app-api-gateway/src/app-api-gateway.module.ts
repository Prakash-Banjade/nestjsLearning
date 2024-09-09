import { Module } from '@nestjs/common';
import { AppApiGatewayController } from './app-api-gateway.controller';
import { AppApiGatewayService } from './app-api-gateway.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppApiGatewayController],
  providers: [AppApiGatewayService],
})
export class AppApiGatewayModule {}
