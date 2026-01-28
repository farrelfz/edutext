import { Queue } from 'bullmq';
import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL ?? '';
const connection = new Redis(redisUrl);

export const pdfQueue = new Queue('pdf-generation', { connection });
