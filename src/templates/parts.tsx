import type { ReactNode } from 'react';
import type { DocumentContent } from '@/lib/validators/document';

export function Header({ title }: { title: string }) {
  return (
    <div className="header-band">
      <div className="logo">EduText</div>
      <div>{title}</div>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function PhaseTable({
  title,
  steps
}: {
  title: string;
  steps: DocumentContent['deepLearningPhases']['persiapan'];
}) {
  return (
    <div className="avoid-break">
      <div className="phase-title">{title}</div>
      <table className="table">
        <thead>
          <tr>
            <th>Judul Langkah</th>
            <th>Tujuan</th>
            <th>Aktivitas Guru</th>
            <th>Aktivitas Siswa</th>
            <th>Waktu</th>
            <th>Media</th>
            <th>Mindful</th>
            <th>Meaningful</th>
            <th>Joyful</th>
          </tr>
        </thead>
        <tbody>
          {steps.map((step, index) => (
            <tr key={index}>
              <td>{step.judulLangkah}</td>
              <td>{step.tujuanLangkah}</td>
              <td>{step.aktivitasGuru}</td>
              <td>{step.aktivitasSiswa}</td>
              <td>{step.waktu}</td>
              <td>{step.media}</td>
              <td>
                <div>{step.mindful.konteksMasalahNyata}</div>
                <div>{step.mindful.pertanyaanPemantik}</div>
                <div>{step.mindful.strategiKesadaran}</div>
              </td>
              <td>
                <div>{step.meaningful.kaitanKehidupanNyata}</div>
                <div>{step.meaningful.konsepKunci}</div>
                <div>{step.meaningful.outputBermakna}</div>
              </td>
              <td>
                <div>{step.joyful.aktivitasMenyenangkan}</div>
                <div>{step.joyful.microReward}</div>
                <div>{step.joyful.kolaborasi}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
