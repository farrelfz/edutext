export function assertDownloadEligibility({
  userQuota,
  documentStatus
}: {
  userQuota: number;
  documentStatus: string;
}) {
  if (documentStatus !== 'READY') {
    throw new Error('NOT_READY');
  }
  if (userQuota <= 0) {
    throw new Error('NO_QUOTA');
  }
}
