import { redirect } from 'next/navigation';
import { requireSession } from '@/lib/session';

export default async function PreviewPage({ params }: { params: { id: string } }) {
  const session = await requireSession();
  if (!session?.user?.email) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">Preview</h1>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <iframe
            title="Preview"
            src={`/api/documents/${params.id}/preview`}
            className="h-[80vh] w-full rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
