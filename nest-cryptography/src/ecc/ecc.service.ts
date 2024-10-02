import { Injectable } from '@nestjs/common';
import { generateKeyPairSync, publicEncrypt } from 'node:crypto';


/**
|--------------------------------------------------
| Elliptic Curve Cryptography (ECC) is the form of public key cryptograhpy based on the algebraic structure 
| of the elliptic curves over finite filelds. It is a widely used public key cryptography algorithm that
| is used to secure communication between two or more parties.
|--------------------------------------------------
*/
@Injectable()
export class EccService {
    private readonly privateKey: string;
    private readonly publicKey: string;

    constructor() {
        const { privateKey, publicKey } = generateKeyPairSync('ec', {
            namedCurve: 'secp256k1', // secp256k1 specifies the eplliptic curve used for key generation. It is the same curve used in Bitcoin and Etherum for cryptographic operations.
            publicKeyEncoding: {
                type: 'spki', // (Subject Public Key Info), a common format for storing public key
                format: 'pem' // a base64 encoded string representation with header and footer lines, makes it easy to transmit and store keys
            },
            privateKeyEncoding: {
                type: 'pkcs8', // a standard syntax for private key information
                format: 'pem'
            }
        })

        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }

    encrypt(message: string): string {
        const encrypted = publicEncrypt(this.publicKey, Buffer.from(message)); // message is converted to a Buffer (binary data) before encryption using key publicKey
        return encrypted.toString('base64'); // message is converted to base64 for easier storage and transmission
    }

    decrypt(encryptedMessage: string): string {
        const decrypted = publicEncrypt(this.privateKey, Buffer.from(encryptedMessage, 'base64')); // the encrypted message (which was Base64 encoded) is converted back to binary data (Buffer) before decryption
        return decrypted.toString('utf8'); // utf8 - human readable format
    }

    getPublicKey(): string {
        return this.publicKey;
    }
}
