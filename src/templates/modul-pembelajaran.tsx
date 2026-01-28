import type { DocumentContent } from '@/lib/validators/document';
import { Header, Section, PhaseTable } from './parts';

export function ModulPembelajaranTemplate({
  content
}: {
  content: DocumentContent & { modulPembelajaran: any };
}) {
  const { identity, deepLearningPhases, assessment, modulPembelajaran } = content as any;
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Modul Pembelajaran</title>
        <link rel="stylesheet" href="/styles/print.css" />
      </head>
      <body>
        <Header title="MODUL PEMBELAJARAN" />
        <Section title="Identitas">
          <table className="table">
            <tbody>
              <tr><th>Mata Pelajaran</th><td>{identity.subject}</td></tr>
              <tr><th>Kelas</th><td>{identity.grade}</td></tr>
              <tr><th>Topik</th><td>{identity.topic}</td></tr>
              <tr><th>Penulis</th><td>{identity.author}</td></tr>
            </tbody>
          </table>
        </Section>
        <Section title="Petunjuk Belajar Mandiri">
          <p>{modulPembelajaran.petunjukBelajarMandiri}</p>
        </Section>
        <Section title="Peta Konsep">
          <p>{modulPembelajaran.petaKonsep}</p>
        </Section>
        <Section title="Uraian Materi Lengkap">
          <p>{modulPembelajaran.uraianMateriLengkap}</p>
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
        <Section title="Contoh Soal Bertahap">
          <p>{modulPembelajaran.contohSoalBertahap}</p>
        </Section>
        <Section title="Latihan Soal">
          <p>{modulPembelajaran.latihanSoal}</p>
        </Section>
        <Section title="Evaluasi Mandiri">
          <p>{modulPembelajaran.evaluasiMandiri}</p>
        </Section>
        <Section title="Asesmen">
          <p><strong>Formatif:</strong> {assessment.formatif}</p>
          <p><strong>Sumatif:</strong> {assessment.sumatif}</p>
        </Section>
        <Section title="Rangkuman">
          <p>{modulPembelajaran.rangkuman}</p>
        </Section>
        <Section title="Glosarium">
          <ul>
            {modulPembelajaran.glosarium.map((item: any, index: number) => (
              <li key={index}><strong>{item.istilah}</strong>: {item.definisi}</li>
            ))}
          </ul>
        </Section>
        <Section title="Daftar Pustaka">
          <ul>
            {modulPembelajaran.daftarPustaka.map((item: any, index: number) => (
              <li key={index}>{item.sitasi}</li>
            ))}
          </ul>
        </Section>
        {modulPembelajaran.optionalKunciJawabanGated && modulPembelajaran.kunciJawaban ? (
          <Section title="Kunci Jawaban">
            <p>{modulPembelajaran.kunciJawaban}</p>
          </Section>
        ) : null}
      </body>
    </html>
  );
}
