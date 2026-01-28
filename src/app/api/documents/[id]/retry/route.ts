import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/session';
import { pdfQueue } from '@/lib/queue';

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const session = await requireSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const document = await prisma.document.findFirst({
    where: { id: params.id, user: { email: session.user.email } }
  });

  if (!document) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (document.status !== 'FAILED') {
    return NextResponse.json({ error: 'Document not failed' }, { status: 400 });
  }

  const updated = await prisma.document.update({
    where: { id: document.id },
    data: { status: 'QUEUED', errorMessage: null }
  });

  await pdfQueue.add('generate', { documentId: document.id }, { attempts: 2 });

  return NextResponse.json(updated);
}
