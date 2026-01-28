import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/session';
import { getSignedPdfUrl } from '@/lib/storage';
import { assertDownloadEligibility } from '@/lib/quota';

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const session = await requireSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const lockedUsers = await tx.$queryRaw<any[]>`
        SELECT * FROM "User" WHERE id = ${user.id} FOR UPDATE
      `;
      const lockedUser = lockedUsers[0];

      const lockedDocuments = await tx.$queryRaw<any[]>`
        SELECT * FROM "Document" WHERE id = ${params.id} FOR UPDATE
      `;
      const lockedDocument = lockedDocuments[0];

      if (!lockedDocument || lockedDocument.userId !== user.id) {
        throw new Error('NOT_FOUND');
      }
      assertDownloadEligibility({
        userQuota: lockedUser.quotaRemaining,
        documentStatus: lockedDocument.status
      });

      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: { quotaRemaining: { decrement: 1 } }
      });

      await tx.quotaLedger.create({
        data: {
          userId: user.id,
          delta: -1,
          reason: 'DOWNLOAD',
          documentId: lockedDocument.id
        }
      });

      return { document: lockedDocument, user: updatedUser };
    });

    if (!result.document.pdfStorageKey) {
      return NextResponse.json({ error: 'PDF not available' }, { status: 400 });
    }
    const url = await getSignedPdfUrl({ key: result.document.pdfStorageKey });
    return NextResponse.json({ url });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'NO_QUOTA') {
        return NextResponse.json({ error: 'Quota depleted' }, { status: 402 });
      }
      if (error.message === 'NOT_READY') {
        return NextResponse.json({ error: 'Document not ready' }, { status: 400 });
      }
      if (error.message === 'NOT_FOUND') {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
