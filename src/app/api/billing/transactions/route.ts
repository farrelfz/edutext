import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/session';

export async function GET() {
  const session = await requireSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const transactions = await prisma.transaction.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: 'desc' },
    include: { plan: true }
  });

  return NextResponse.json(transactions);
}
