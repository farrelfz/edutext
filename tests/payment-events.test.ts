import { describe, it, expect } from 'vitest';
import { buildEventKey } from '../src/lib/payment-events';

describe('payment event key', () => {
  it('builds stable idempotency key', () => {
    const key1 = buildEventKey({ orderId: 'ORDER-1', transactionStatus: 'settlement', fraudStatus: 'accept' });
    const key2 = buildEventKey({ orderId: 'ORDER-1', transactionStatus: 'settlement', fraudStatus: 'accept' });
    expect(key1).toBe(key2);
  });
});
