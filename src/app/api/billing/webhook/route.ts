import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyMidtransSignature } from '@/lib/midtrans';
import { buildEventKey } from '@/lib/payment-events';

export async function POST(request: Request) {
  const payload = await request.json();

  const {
    order_id: orderId,
    status_code: statusCode,
    gross_amount: grossAmount,
    signature_key: signatureKey,
    transaction_status: transactionStatus,
    fraud_status: fraudStatus,
    transaction_id: transactionId
  } = payload;

  const validSignature = verifyMidtransSignature({
    orderId,
    statusCode,
    grossAmount,
    signatureKey
  });

  if (!validSignature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const eventKey = buildEventKey({ orderId, transactionStatus, fraudStatus });

  try {
    await prisma.paymentEvent.create({
      data: {
        provider: 'MIDTRANS',
        eventKey,
        rawJson: payload
      }
    });
  } catch (error) {
    return NextResponse.json({ received: true });
  }

  const transaction = await prisma.transaction.findUnique({
    where: { midtransOrderId: orderId },
    include: { plan: true }
  });

  if (!transaction) {
    return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
  }

  const isSuccess =
    transactionStatus === 'settlement' ||
    (transactionStatus === 'capture' && fraudStatus === 'accept');

  const newStatus = isSuccess
    ? 'SUCCESS'
    : transactionStatus === 'expire'
    ? 'EXPIRED'
    : transactionStatus === 'cancel'
    ? 'FAILED'
    : 'PENDING';

  await prisma.transaction.update({
    where: { id: transaction.id },
    data: {
      status: newStatus,
      midtransTransactionId: transactionId,
      rawResponse: payload
    }
  });

  if (isSuccess) {
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: transaction.userId },
        data: { quotaRemaining: { increment: transaction.plan.downloads } }
      });

      await tx.quotaLedger.create({
        data: {
          userId: transaction.userId,
          delta: transaction.plan.downloads,
          reason: 'PURCHASE',
          transactionId: transaction.id
        }
      });
    });
  }

  return NextResponse.json({ received: true });
}
