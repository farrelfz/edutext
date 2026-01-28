import type { DocumentContent } from '@/lib/validators/document';
import { Header, Section, PhaseTable } from './parts';

export function RppTemplate({ content }: { content: DocumentContent & { rpp: any } }) {
  const { identity, curriculum, deepLearningPhases, assessment, rpp } = content as any;
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>RPP</title>
        <link rel="stylesheet" href="/styles/print.css" />
      </head>
      <body>
        <Header title="RPP" />
        <Section title="Identitas">
          <table className="table">
            <tbody>
              <tr><th>Mata Pelajaran</th><td>{identity.subject}</td></tr>
              <tr><th>Kelas</th><td>{identity.grade}</td></tr>
              <tr><th>Topik</th><td>{identity.topic}</td></tr>
              <tr><th>Guru</th><td>{identity.author}</td></tr>
              <tr><th>Durasi</th><td>{identity.duration}</td></tr>
            </tbody>
          </table>
        </Section>
        <Section title="Tujuan & Materi">
          <p><strong>Tujuan Pembelajaran:</strong> {curriculum.tujuanPembelajaran}</p>
          <p><strong>Materi Ringkas:</strong> {rpp.materiRingkas}</p>
          <p><strong>Strategi/Metode:</strong> {rpp.strategiKelas}</p>
        </Section>
        <Section title="Deep Learning - Persiapan">
          <PhaseTable title="Persiapan" steps={deepLearningPhases.persiapan} />
        </Section>
        <Section title="Deep Learning - Eksplorasi">
          <PhaseTable title="Eksplorasi" steps={deepLearningPhases.eksplorasi} />
        </Section>
        <Section title="Deep Learning - Aplikasi">
          <PhaseTable title="Aplikasi" steps={deepLearningPhases.aplikasi} />
        </Section>
        <Section title="Deep Learning - Refleksi & Evaluasi">
          <PhaseTable title="Refleksi & Evaluasi" steps={deepLearningPhases.refleksiEvaluasi} />
        </Section>
        <Section title="Penilaian">
          <p><strong>Teknik:</strong> {rpp.penilaian.teknik}</p>
          <p><strong>Instrumen:</strong> {rpp.penilaian.instrumen}</p>
          <p><strong>KKM:</strong> {rpp.penilaian.kriteriaKetuntasan}</p>
          <p><strong>Formatif:</strong> {assessment.formatif}</p>
          <p><strong>Sumatif:</strong> {assessment.sumatif}</p>
        </Section>
        <Section title="Remedial & Pengayaan">
          <p><strong>Remedial:</strong> {rpp.remedial}</p>
          <p><strong>Pengayaan:</strong> {rpp.pengayaan}</p>
        </Section>
        <Section title="Catatan Guru & Sumber Belajar">
          <p><strong>Catatan Guru:</strong> {rpp.catatanGuru}</p>
          <p><strong>Sumber Belajar:</strong> {rpp.sumberBelajar}</p>
        </Section>
      </body>
    </html>
  );
}
