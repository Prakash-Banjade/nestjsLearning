import { Test, TestingModule } from '@nestjs/testing';
import { AppApiGatewayController } from './app-api-gateway.controller';
import { AppApiGatewayService } from './app-api-gateway.service';

describe('AppApiGatewayController', () => {
  let appApiGatewayController: AppApiGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppApiGatewayController],
      providers: [AppApiGatewayService],
    }).compile();

    appApiGatewayController = app.get<AppApiGatewayController>(AppApiGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appApiGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
