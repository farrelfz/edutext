import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/session';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DocumentForm } from '@/components/document-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function DashboardPage() {
  const session = await requireSession();
  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  const documents = await prisma.document.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-lg font-semibold text-brand-600">EduText Dashboard</div>
            <p className="text-sm text-slate-500">Welcome back, {user?.name ?? 'Educator'}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge>Quota: {user?.quotaRemaining ?? 0}</Badge>
            <Link href="/billing">
              <Button>Top Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8">
        <section className="grid gap-6 md:grid-cols-4">
          <Card>
            <div className="text-sm text-slate-500">Remaining quota</div>
            <div className="text-2xl font-semibold">{user?.quotaRemaining ?? 0}</div>
          </Card>
          <Card>
            <div className="text-sm text-slate-500">Documents generated</div>
            <div className="text-2xl font-semibold">{documents.length}</div>
          </Card>
          <Card>
            <div className="text-sm text-slate-500">Downloads this month</div>
            <div className="text-2xl font-semibold">0</div>
          </Card>
          <Card>
            <div className="text-sm text-slate-500">Last activity</div>
            <div className="text-2xl font-semibold">Draft</div>
          </Card>
        </section>
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Buat Dokumen</h2>
          <p className="text-sm text-slate-500">Lengkapi form untuk Deep Learning + 3M.</p>
          <div className="mt-6">
            <DocumentForm />
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-slate-900">Dokumen Anda</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2">Type</th>
                  <th>Title</th>
                  <th>Topic</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-t border-slate-200">
                    <td className="py-2">{doc.docType}</td>
                    <td>{doc.title}</td>
                    <td>{doc.topic}</td>
                    <td>{doc.status}</td>
                    <td className="flex gap-2 py-2">
                      <Link href={`/documents/${doc.id}`}>
                        <Button className="bg-slate-100 text-slate-700">Detail</Button>
                      </Link>
                      <Link href={`/documents/${doc.id}/preview`}>
                        <Button className="bg-slate-100 text-slate-700">Preview</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
