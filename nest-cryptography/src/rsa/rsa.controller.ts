import { Controller, Get, Post, Body } from '@nestjs/common';
import { RsaService } from './rsa.service';

@Controller('rsa')
export class RsaController {
    constructor(private readonly rsaService: RsaService) { }

    @Get('public-key')
    getPublicKey() {
        return this.rsaService.getPublicKey();
    }

    @Post('encrypt')
    encryptMessage(@Body('message') message: string) {
        return this.rsaService.encryptMessage(message);
    }

    @Post('decrypt')
    decryptMessage(@Body('message') encryptedMessage: string) {
        return this.rsaService.decryptMessage(encryptedMessage);
    }
}
