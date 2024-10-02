import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, createECDH, generateKeyPairSync, publicEncrypt, randomBytes } from 'node:crypto';


/**
|--------------------------------------------------
| Elliptic Curve Cryptography (ECC) is the form of public key cryptograhpy based on the algebraic structure 
| of the elliptic curves over finite filelds. It is a widely used public key cryptography algorithm that
| is used to secure communication between two or more parties.
|--------------------------------------------------
*/
@Injectable()
export class EccServiceV2 {
    private privateKey: Buffer;
    private publicKey: Buffer;

    constructor() {
        const ecdh = createECDH('secp256k1'); // Bitcoin curve
        this.privateKey = ecdh.generateKeys();
        this.publicKey = ecdh.getPublicKey();
    }

    encryptMessage(message: string, recipientPublicKey: Buffer): string {
        const ecdh = createECDH('secp256k1'); // ecdh - Elliptic Curve Diffie-Hellman
        ecdh.setPrivateKey(this.privateKey);

        // Generate the shared secret using the recipient's public key
        const sharedSecret = ecdh.computeSecret(recipientPublicKey);

        // Use the shared secret to derive a symmetric key for AES encryption
        const iv = randomBytes(16); // Initialization vector
        const cipher = createCipheriv('aes-256-gcm', sharedSecret.subarray(0, 32), iv); // subarray() is a way to create a subset of a buffer without copying memory. It creates a new view of the original buffer from start to end indices.

        let encrypted = cipher.update(message, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag().toString('hex');

        return JSON.stringify({
            iv: iv.toString('hex'),
            encrypted,
            authTag,
        });
    }

    decryptMessage(encryptedMessage: string, senderPublicKey: Buffer): string {
        const ecdh = createECDH('secp256k1');
        ecdh.setPrivateKey(this.privateKey);

        // Generate the shared secret using the sender's public key
        const sharedSecret = ecdh.computeSecret(senderPublicKey);

        // Parse the encrypted message
        const { iv, encrypted, authTag } = JSON.parse(encryptedMessage);

        // Decrypt using the shared secret and AES
        const decipher = createDecipheriv('aes-256-gcm', sharedSecret.subarray(0, 32), Buffer.from(iv, 'hex'));
        decipher.setAuthTag(Buffer.from(authTag, 'hex'));

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    }

    getPublicKey(): Buffer {
        return this.publicKey;
    }
}
