import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/session';
import { documentSchemas } from '@/lib/validators/document';
import { z } from 'zod';

const payloadSchema = z.object({
  id: z.string().uuid().optional(),
  docType: z.enum(['MODUL_AJAR', 'RPP', 'MODUL_PEMBELAJARAN']),
  title: z.string().min(1),
  subject: z.string().min(1),
  grade: z.string().min(1),
  topic: z.string().min(1),
  contentJson: z.unknown()
});

export async function GET() {
  const session = await requireSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const documents = await prisma.document.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json(documents);
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const schema = documentSchemas[parsed.data.docType];
  const validation = schema.safeParse(parsed.data.contentJson);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error.flatten() }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const data = {
    userId: user.id,
    docType: parsed.data.docType,
    title: parsed.data.title,
    subject: parsed.data.subject,
    grade: parsed.data.grade,
    topic: parsed.data.topic,
    contentJson: parsed.data.contentJson
  };

  const document = parsed.data.id
    ? await prisma.document.update({
        where: { id: parsed.data.id, userId: user.id },
        data
      })
    : await prisma.document.create({ data });

  return NextResponse.json(document);
}
