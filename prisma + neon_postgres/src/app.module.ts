import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from './logger/logger.module';

@Module({
    imports: [
        UsersModule,
        DatabaseModule,
        EmployeesModule,
        ThrottlerModule.forRoot([{ // rate limiting, only 3 requests per second
            ttl: 1000, // mili second
            limit: 3,
        }]),
        LoggerModule,
        // throttling can be done on controller scope also, can be skipped
        // REF: https://docs.nestjs.com/security/rate-limiting
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // consumer.apply(logEvents).forRoutes('employees')
        {/*
        -> Using RequestMethod from '@nestjs/common'
                .forRoute({path: 'employees', method: RequestMethod.GET})
        -> Using route wildcards
                .forRoute({path: 'ab*cd', method: RequestMethod.ALL}) // 'ab*cd' route path will match abcd, ab_cd, abecd, and so on
        -> Middleware consumer is a `helper class`. `forRoutes()` method can take a single string, multiple strings, a `RouteInfo` object, single and multiple controller class.
                .forRoutes(EmployeesController)
        -> Excluding routes
                .apply(Middleware).exclude('') // similar as forRoutes() method but opposite
        -> Multiple middlewares
                .apply(Middleware, cors(), helmet(), Logger)
        -> Functional middlewares 
                .apply(FunctionalMiddleware)


        #REF: https://docs.nestjs.com/middleware
    */}
    }
}
