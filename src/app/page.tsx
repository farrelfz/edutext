import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div>
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-xl font-semibold text-brand-600">EduText</div>
          <nav className="hidden gap-6 text-sm text-slate-600 md:flex">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>
          <Link href="/login">
            <Button>Continue with Google</Button>
          </Link>
        </div>
      </header>
      <main>
        <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 md:flex-row md:items-center">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl font-semibold text-slate-900">
              Generate Modul Ajar, RPP, dan Modul Pembelajaran dalam hitungan menit
            </h1>
            <p className="text-lg text-slate-600">
              Deep Learning 4 fase + Mindful, Meaningful, Joyful untuk dokumen pembelajaran yang siap diunduh.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/login">
                <Button>Continue with Google</Button>
              </Link>
              <Button className="bg-white text-brand-600 border border-brand-200 hover:bg-brand-50">View Sample Output</Button>
            </div>
          </div>
          <div className="flex-1">
            <Card className="bg-gradient-to-br from-brand-50 to-white">
              <h2 className="text-xl font-semibold">Apa yang kamu dapatkan</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Modul Ajar lengkap dengan LKPD & rubrik.</li>
                <li>RPP eksekusi kelas berbasis Deep Learning.</li>
                <li>Modul Pembelajaran mandiri dengan contoh & latihan.</li>
              </ul>
            </Card>
          </div>
        </section>
        <section id="features" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="section-title">Deep Learning 4 fase</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-4">
            {['Persiapan', 'Eksplorasi', 'Aplikasi', 'Refleksi & Evaluasi'].map((item) => (
              <Card key={item}>
                <h3 className="text-base font-semibold text-brand-600">{item}</h3>
                <p className="mt-2 text-sm text-slate-600">Mindful, Meaningful, Joyful tertanam di tiap fase.</p>
              </Card>
            ))}
          </div>
        </section>
        <section id="how" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="section-title">How it works</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-4">
            {['Login', 'Isi Form', 'Generate', 'Download'].map((step, index) => (
              <Card key={step}>
                <div className="text-sm font-semibold text-brand-600">Step {index + 1}</div>
                <p className="mt-2 text-sm text-slate-600">{step}</p>
              </Card>
            ))}
          </div>
        </section>
        <section id="pricing" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="section-title">Pricing</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[{ name: 'Starter', price: 'Rp129.000', downloads: 10 }, { name: 'Pro', price: 'Rp399.000', downloads: 50 }, { name: 'School', price: 'Custom', downloads: 'Custom' }].map((plan) => (
              <Card key={plan.name}>
                <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                <p className="mt-2 text-2xl font-semibold text-brand-600">{plan.price}</p>
                <p className="mt-2 text-sm text-slate-600">{plan.downloads} downloads</p>
                <Button className="mt-4 w-full">Pilih Paket</Button>
              </Card>
            ))}
          </div>
        </section>
        <section id="faq" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="section-title">FAQ</h2>
          <div className="mt-6 space-y-4">
            <Card>
              <h3 className="text-base font-semibold">Apakah quota dipotong saat generate?</h3>
              <p className="mt-2 text-sm text-slate-600">Tidak, quota dipotong hanya saat download PDF siap.</p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold">Apakah tersedia preview?</h3>
              <p className="mt-2 text-sm text-slate-600">Ya, preview HTML tersedia sebelum generate PDF.</p>
            </Card>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-sm text-slate-500">
          <span>© 2024 EduText</span>
          <span>Deep Learning + 3M</span>
        </div>
      </footer>
    </div>
  );
}
