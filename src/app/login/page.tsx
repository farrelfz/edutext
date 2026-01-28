'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Masuk ke EduText</h1>
          <p className="mt-2 text-sm text-slate-600">Login aman dengan Google. Kami menyimpan sesi via httpOnly cookies.</p>
        </div>
        <Button className="w-full" onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>
          Continue with Google
        </Button>
        <p className="text-xs text-slate-500">Dengan masuk, Anda menyetujui kebijakan privasi dan syarat layanan EduText.</p>
      </div>
    </div>
  );
}
