import { Body, Controller, Get, Post } from '@nestjs/common';
import { EccService } from './ecc.service';
import { EccServiceV2 } from './ecc.service-v2';
import { EccServiceElliptic } from './ecc.service-elliptic';

@Controller('ecc')
export class EccController {
    constructor(private readonly eccService: EccServiceElliptic) { }

    @Get('public-key')
    getPublicKey(): string {
        // Return the server's public key to the client
        return this.eccService.getPublicKey().toString();
    }

    // Endpoint to encrypt a message using the client's public key
    @Post('encrypt')
    encryptMessage(@Body('message') message: string, @Body('publicKey') publicKey: string): string {
        // Encrypt the message using the client's public key
        return this.eccService.encryptMessage(message, publicKey);
    }

    // Endpoint to decrypt a message using the server's private key
    @Post('decrypt')
    decryptMessage(@Body('encryptedMessage') encryptedMessage: string, @Body('publicKey') publicKey: string): string {
        // Decrypt the message using the sender's public key
        return this.eccService.decryptMessage(encryptedMessage, publicKey);
    }
}
