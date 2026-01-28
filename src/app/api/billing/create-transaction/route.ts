import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/session';
import { createSnapTransaction, getMidtransConfig } from '@/lib/midtrans';
import { rateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

const payloadSchema = z.object({
  planId: z.string().min(1)
});

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const limiter = await rateLimit({ key: `billing:${session.user.email}`, limit: 3, windowMs: 60000 });
  if (!limiter.allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const body = await request.json();
  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const plan = await prisma.plan.findUnique({ where: { id: parsed.data.planId } });
  if (!plan || !plan.isActive) {
    return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const transaction = await prisma.transaction.create({
    data: {
      userId: user.id,
      planId: plan.id,
      amountIdr: plan.priceIdr,
      midtransOrderId: ''
    }
  });

  const orderId = `EDUTEXT-${transaction.id}`;
  await prisma.transaction.update({
    where: { id: transaction.id },
    data: { midtransOrderId: orderId }
  });

  const snapPayload = {
    transaction_details: {
      order_id: orderId,
      gross_amount: plan.priceIdr
    },
    customer_details: {
      first_name: user.name ?? 'EduText User',
      email: user.email
    },
    item_details: [
      {
        id: plan.id,
        price: plan.priceIdr,
        quantity: 1,
        name: `${plan.name} (${plan.downloads} downloads)`
      }
    ]
  };

  const snap = await createSnapTransaction(snapPayload);
  const { clientKey, snapJsUrl } = getMidtransConfig();

  return NextResponse.json({ snapToken: snap.token, clientKey, snapJsUrl });
}
