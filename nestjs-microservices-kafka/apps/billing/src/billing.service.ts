import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class BillingService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(data: any) {
    // .send() is not like .emit() that emit an event and forgets about response
    // .send() is used when we expect a response back, .send() will only work when we subscribe to the response
    // the 'user.get' event should be of @MessagePattern()
    this.authClient.send('user.get', { userId: data.userId })
      .subscribe(user => {
        console.log(`Billing user: ${user.username} for product ${data.productId} and amount of ${data.price} for ${data.quantity} quantity`);
      });
  }
}
