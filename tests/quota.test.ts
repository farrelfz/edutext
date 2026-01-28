import { describe, it, expect } from 'vitest';
import { assertDownloadEligibility } from '../src/lib/quota';

describe('quota eligibility', () => {
  it('allows download when ready and quota > 0', () => {
    expect(() => assertDownloadEligibility({ userQuota: 1, documentStatus: 'READY' })).not.toThrow();
  });

  it('blocks download when quota is zero', () => {
    expect(() => assertDownloadEligibility({ userQuota: 0, documentStatus: 'READY' })).toThrow('NO_QUOTA');
  });

  it('blocks download when document not ready', () => {
    expect(() => assertDownloadEligibility({ userQuota: 1, documentStatus: 'FAILED' })).toThrow('NOT_READY');
  });
});
