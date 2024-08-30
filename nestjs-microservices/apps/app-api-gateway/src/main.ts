import { NestFactory } from '@nestjs/core';
import { AppApiGatewayModule } from './app-api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(AppApiGatewayModule);
  await app.listen(3000);
}
bootstrap();
