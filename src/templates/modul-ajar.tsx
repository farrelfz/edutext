import type { DocumentContent } from '@/lib/validators/document';
import { Header, Section, PhaseTable } from './parts';

export function ModulAjarTemplate({ content }: { content: DocumentContent & { modulAjar: any } }) {
  const { identity, curriculum, resources, deepLearningPhases, assessment, modulAjar } = content as any;
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Modul Ajar</title>
        <link rel="stylesheet" href="/styles/print.css" />
      </head>
      <body>
        <Header title="MODUL AJAR" />
        <Section title="Identitas Modul">
          <table className="table">
            <tbody>
              <tr><th>Mata Pelajaran</th><td>{identity.subject}</td></tr>
              <tr><th>Kelas</th><td>{identity.grade}</td></tr>
              <tr><th>Topik</th><td>{identity.topic}</td></tr>
              <tr><th>Guru</th><td>{identity.author}</td></tr>
              <tr><th>Sekolah</th><td>{identity.school}</td></tr>
              <tr><th>Tahun</th><td>{identity.year}</td></tr>
              <tr><th>Durasi</th><td>{identity.duration}</td></tr>
            </tbody>
          </table>
        </Section>
        <Section title="Informasi Umum">
          <p><strong>CP:</strong> {curriculum.capaianPembelajaran}</p>
          <p><strong>Kompetensi Awal:</strong> {curriculum.kompetensiAwal}</p>
          <p><strong>Profil Pelajar Pancasila:</strong> {curriculum.profilPelajarPancasila}</p>
          <p><strong>Sarana &amp; Prasarana:</strong> {resources.tools}</p>
        </Section>
        <Section title="Pemahaman Bermakna + Pertanyaan Pemantik">
          <p>{modulAjar.pemahamanBermakna}</p>
          <p>{modulAjar.rangkumanMateri}</p>
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
        <Section title="Asesmen">
          <p><strong>Formatif:</strong> {assessment.formatif}</p>
          <p><strong>Sumatif:</strong> {assessment.sumatif}</p>
          <table className="table">
            <thead>
              <tr>
                <th>Kriteria</th>
                <th>Level 4</th>
                <th>Level 3</th>
                <th>Level 2</th>
                <th>Level 1</th>
              </tr>
            </thead>
            <tbody>
              {assessment.rubrik.map((row: any, index: number) => (
                <tr key={index}>
                  <td>{row.kriteria}</td>
                  <td>{row.level4}</td>
                  <td>{row.level3}</td>
                  <td>{row.level2}</td>
                  <td>{row.level1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
        <Section title="LKPD">
          {modulAjar.lkpdBlocks.map((block: any, index: number) => (
            <div key={index} className="avoid-break">
              <h3>{block.judul}</h3>
              <p><strong>Instruksi:</strong> {block.instruksi}</p>
              <p><strong>Langkah:</strong> {block.langkah}</p>
              <p><strong>Pertanyaan:</strong> {block.pertanyaan}</p>
            </div>
          ))}
        </Section>
        <Section title="Remedial & Pengayaan">
          <p><strong>Remedial:</strong> {modulAjar.remedial}</p>
          <p><strong>Pengayaan:</strong> {modulAjar.pengayaan}</p>
        </Section>
        <Section title="Refleksi">
          <p><strong>Guru:</strong> {modulAjar.refleksiGuru}</p>
          <p><strong>Peserta Didik:</strong> {modulAjar.refleksiPesertaDidik}</p>
        </Section>
        <Section title="Glosarium">
          <ul>
            {modulAjar.glosarium.map((item: any, index: number) => (
              <li key={index}><strong>{item.istilah}</strong>: {item.definisi}</li>
            ))}
          </ul>
        </Section>
        <Section title="Daftar Pustaka">
          <ul>
            {modulAjar.daftarPustaka.map((item: any, index: number) => (
              <li key={index}>{item.sitasi}</li>
            ))}
          </ul>
        </Section>
      </body>
    </html>
  );
}
