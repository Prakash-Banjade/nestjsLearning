import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './dto/order-created.event';

// type Order = {
//     id: string;
//     userId: string;
//     productId: string;
//     quantity: number;
//     price: number;
// }

@Injectable()
export class OrdersService {
    constructor(
        @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka, // injecting the billing client (microservice)
    ) { }


    create(createOrderDto: CreateOrderDto) {
        // if you simply pass a plain object, nestjs will serialize it and convert it to stringified json,
        // however, we are using class instance, nestjs will invoke .toString() method and if not implemented none of the property will actually be transmitted
        const dto = new OrderCreatedEvent(createOrderDto);
        this.billingClient.emit('order.created', dto);
    }

    findAll() { }
}
