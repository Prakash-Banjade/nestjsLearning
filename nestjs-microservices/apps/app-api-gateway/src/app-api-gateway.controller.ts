import { Controller, Get } from '@nestjs/common';
import { AppApiGatewayService } from './app-api-gateway.service';

@Controller()
export class AppApiGatewayController {
  constructor(private readonly appApiGatewayService: AppApiGatewayService) {}

  @Get()
  getHello(): string {
    return this.appApiGatewayService.getHello();
  }
}
