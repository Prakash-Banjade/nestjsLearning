import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EmployeesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
