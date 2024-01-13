import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from './config/cors.config';
import { LoggerService } from './logger/logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;

  // Instantiate LoggerMiddleware before using it as a global middleware or simply a functional middleware can be used
  // const loggerMiddleware = new LoggerMiddleware();
  // app.use(loggerMiddleware.use.bind(loggerMiddleware));

  // app.use(app.get(LoggerService))

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))

  app.enableCors(corsOptions); // if no options, any origin can access

  app.setGlobalPrefix('api'); // global perfix that will attach before every route endpoint: `/users` will be now `/api/users`

  try {
    await app.listen(PORT);
    console.log(`Server running on port ${PORT}`)
  } catch (e) {
    console.log(e);
  }
}
bootstrap();
