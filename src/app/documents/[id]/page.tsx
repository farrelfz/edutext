import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/session';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function DocumentDetailPage({ params }: { params: { id: string } }) {
  const session = await requireSession();
  if (!session?.user?.email) {
    redirect('/login');
  }

  const document = await prisma.document.findFirst({
    where: { id: params.id, user: { email: session.user.email } }
  });

  if (!document) {
    redirect('/dashboard');
  }

  const content = document.contentJson as any;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <Card>
          <h1 className="text-2xl font-semibold text-slate-900">{document.title}</h1>
          <p className="text-sm text-slate-500">{document.docType} • {document.status}</p>
          <div className="mt-4 flex gap-3">
            <Link href={`/documents/${document.id}/preview`}>
              <Button>Preview</Button>
            </Link>
            <Button className="bg-slate-100 text-slate-700">Generate PDF</Button>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Deep Learning + 3M Mapping</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {['persiapan', 'eksplorasi', 'aplikasi', 'refleksiEvaluasi'].map((phaseKey) => (
              <div key={phaseKey} className="rounded-xl border border-slate-200 p-4">
                <h3 className="text-sm font-semibold text-brand-600">{phaseKey}</h3>
                <p className="text-xs text-slate-500">Mindful: {content.deepLearningPhases[phaseKey][0]?.mindful?.konteksMasalahNyata}</p>
                <p className="text-xs text-slate-500">Meaningful: {content.deepLearningPhases[phaseKey][0]?.meaningful?.kaitanKehidupanNyata}</p>
                <p className="text-xs text-slate-500">Joyful: {content.deepLearningPhases[phaseKey][0]?.joyful?.aktivitasMenyenangkan}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
