export function buildEventKey({
  orderId,
  transactionStatus,
  fraudStatus
}: {
  orderId: string;
  transactionStatus: string;
  fraudStatus?: string | null;
}) {
  return `${orderId}:${transactionStatus}:${fraudStatus ?? ''}`;
}
