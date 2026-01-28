import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/session';
import { renderTemplate } from '@/lib/template-renderer';

export async function GET(_: Request, { params }: { params: { id: string } }) {
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

  const html = renderTemplate({
    docType: document.docType,
    content: document.contentJson as any
  });

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
