import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.listen(3000).then(() => {
    console.log('Server started on port 3000');
  })
}
bootstrap();
