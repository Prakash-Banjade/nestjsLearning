import { Injectable } from '@nestjs/common';

@Injectable()
export class AppApiGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
