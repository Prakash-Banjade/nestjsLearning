import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmployeesModule } from 'src/employees/employees.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    EmployeesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
