import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'EduText',
  description: 'Generate Modul Ajar, RPP, dan Modul Pembelajaran.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
