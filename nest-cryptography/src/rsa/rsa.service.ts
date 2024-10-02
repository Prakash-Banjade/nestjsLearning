import { Injectable } from '@nestjs/common';
import { generateKeyPairSync, publicEncrypt, privateDecrypt } from 'node:crypto';

@Injectable()
export class RsaService {
    private privateKey: string;
    private publicKey: string;

    constructor() {
        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        });

        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }

    encryptMessage(message: string): string {
        const encrypted = publicEncrypt(this.publicKey, Buffer.from(message));
        return encrypted.toString('base64');
    }

    decryptMessage(encryptedMessage: string): string {
        const decrypted = privateDecrypt(this.privateKey, Buffer.from(encryptedMessage, 'base64'));
        return decrypted.toString('utf8');
    }

    getPublicKey(): string {
        return this.publicKey;
    }
}
