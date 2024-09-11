import { NestFactory } from '@nestjs/core';
import { ProductsAppModule } from './products-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductsAppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3002,
      }
    }
  );

  await app.listen();
}
bootstrap();
