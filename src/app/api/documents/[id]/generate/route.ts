import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/session';
import { documentSchemas } from '@/lib/validators/document';
import { pdfQueue } from '@/lib/queue';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const session = await requireSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const limiter = await rateLimit({ key: `generate:${session.user.email}`, limit: 5, windowMs: 60000 });
  if (!limiter.allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const document = await prisma.document.findFirst({
    where: { id: params.id, user: { email: session.user.email } }
  });

  if (!document) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const schema = documentSchemas[document.docType];
  const validation = schema.safeParse(document.contentJson);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error.flatten() }, { status: 400 });
  }

  const updated = await prisma.document.update({
    where: { id: document.id },
    data: { status: 'QUEUED', errorMessage: null }
  });

  await pdfQueue.add('generate', { documentId: document.id }, { attempts: 2 });

  return NextResponse.json(updated);
}
