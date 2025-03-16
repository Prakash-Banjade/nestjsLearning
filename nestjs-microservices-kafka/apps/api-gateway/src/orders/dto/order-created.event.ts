import { CreateOrderDto } from "./create-order.dto";

export class OrderCreatedEvent extends CreateOrderDto {
    constructor(dto: CreateOrderDto) {
        super();
        Object.assign(this, dto);
    }

    // this method is automatically invoked by nestjs to serialize the event payload
    toString() {
        return JSON.stringify(this);
    }
}