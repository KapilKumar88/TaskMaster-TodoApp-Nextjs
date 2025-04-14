'use server';
import 'server-only';
import crypto from 'node:crypto';
import serverSideConfig from '@/config/server.config';

const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export async function generateRandomToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

export async function encryptHelper(text: string) {
  const cipher = crypto.createCipheriv(
    serverSideConfig.ENCRYPTION_ALGORITHM,
    secretKey,
    iv,
  );
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export async function decryptHelper(text: string) {
  const decipher = crypto.createDecipheriv(
    serverSideConfig.ENCRYPTION_ALGORITHM,
    secretKey,
    iv,
  );
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
