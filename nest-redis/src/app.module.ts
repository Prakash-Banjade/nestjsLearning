import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/db-config';
import { User } from './users/users.entity';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Product } from './products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService),
    TypeOrmModule.forFeature([User, Product]),
    CacheModule.register({
      isGlobal: true,
      ttl: 60000,
      max: 1000,
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule { }
