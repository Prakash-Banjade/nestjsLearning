import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
            clientId: 'auth',
          },
          consumer: {
            groupId: 'auth-consumer',
          }
        }
      }
    ]),
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule { }
