import { Injectable } from '@nestjs/common';
import { createECDH, createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { ec as EC } from 'elliptic'; // Import elliptic library

@Injectable()
export class EccServiceElliptic {
  private privateKey: Buffer;
  private publicKey: Buffer;
  private ec: EC; // Define EC instance

  constructor() {
    this.ec = new EC('secp256k1'); // Initialize elliptic curve instance

    const ecdh = createECDH('secp256k1');
    this.privateKey = ecdh.generateKeys();
    this.publicKey = ecdh.getPublicKey();
  }

  encryptMessage(message: string, recipientPublicKey: string): string {
    // Convert recipient public key from hex to elliptic key format
    const key = this.ec.keyFromPublic(recipientPublicKey, 'hex').getPublic();

    // Create ECDH and compute shared secret
    const ecdh = createECDH('secp256k1');
    ecdh.setPrivateKey(this.privateKey);

    const sharedSecret = ecdh.computeSecret(Buffer.from(key.encode('hex', false), 'hex'));

    // Use shared secret for AES encryption
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-gcm', sharedSecret.subarray(0, 32), iv);

    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');

    return JSON.stringify({
      iv: iv.toString('hex'),
      encrypted,
      authTag,
    });
  }

  decryptMessage(encryptedMessage: string, senderPublicKey: string): string {
    // Convert sender public key from hex to elliptic key format
    const key = this.ec.keyFromPublic(senderPublicKey, 'hex').getPublic();

    // Create ECDH and compute shared secret
    const ecdh = createECDH('secp256k1');
    ecdh.setPrivateKey(this.privateKey);

    const sharedSecret = ecdh.computeSecret(Buffer.from(key.encode('hex', false), 'hex'));

    // Parse encrypted message
    const { iv, encrypted, authTag } = JSON.parse(encryptedMessage);

    // Decrypt using shared secret and AES
    const decipher = createDecipheriv('aes-256-gcm', sharedSecret.subarray(0, 32), Buffer.from(iv, 'hex'));
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  getPublicKey(): string {
    return this.publicKey.toString('hex');
  }
}
