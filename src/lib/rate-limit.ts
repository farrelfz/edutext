import Redis from 'ioredis';

const inMemoryStore = new Map<string, { count: number; resetAt: number }>();

const redisUrl = process.env.REDIS_URL;
const redis = redisUrl ? new Redis(redisUrl) : null;

export async function rateLimit({
  key,
  limit,
  windowMs
}: {
  key: string;
  limit: number;
  windowMs: number;
}) {
  const now = Date.now();
  if (!redis) {
    const entry = inMemoryStore.get(key);
    if (!entry || entry.resetAt < now) {
      inMemoryStore.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true };
    }
    if (entry.count >= limit) {
      return { allowed: false };
    }
    entry.count += 1;
    return { allowed: true };
  }

  const windowSeconds = Math.ceil(windowMs / 1000);
  const redisKey = `rate:${key}`;
  const count = await redis.incr(redisKey);
  if (count === 1) {
    await redis.expire(redisKey, windowSeconds);
  }
  return { allowed: count <= limit };
}
