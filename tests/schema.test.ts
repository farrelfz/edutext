import { describe, it, expect } from 'vitest';
import { documentSchemas } from '../src/lib/validators/document';

const sampleContent = {
  identity: {
    subject: 'Matematika',
    grade: '5',
    topic: 'Pecahan',
    author: 'Guru',
    school: 'SD Nusantara',
    year: '2024',
    duration: '2 JP'
  },
  curriculum: {
    capaianPembelajaran: 'CP',
    tujuanPembelajaran: 'TP',
    profilPelajarPancasila: 'Profil',
    kompetensiAwal: 'Kompetensi'
  },
  resources: {
    media: 'Media',
    tools: 'Tools',
    references: 'References'
  },
  deepLearningPhases: {
    persiapan: [
      {
        judulLangkah: 'Langkah',
        tujuanLangkah: 'Tujuan',
        aktivitasGuru: 'Guru',
        aktivitasSiswa: 'Siswa',
        waktu: '10m',
        media: 'Media',
        mindful: {
          konteksMasalahNyata: 'Konteks',
          pertanyaanPemantik: 'Pemantik',
          strategiKesadaran: 'Strategi'
        },
        meaningful: {
          kaitanKehidupanNyata: 'Kaitan',
          konsepKunci: 'Konsep',
          outputBermakna: 'Output'
        },
        joyful: {
          aktivitasMenyenangkan: 'Aktivitas',
          microReward: 'Reward',
          kolaborasi: 'Kolab'
        }
      }
    ],
    eksplorasi: [],
    aplikasi: [],
    refleksiEvaluasi: []
  },
  assessment: {
    formatif: 'Formatif',
    sumatif: 'Sumatif',
    rubrik: [
      { kriteria: 'Kriteria', level4: '4', level3: '3', level2: '2', level1: '1' }
    ]
  }
};

describe('document schema', () => {
  it('requires deep learning phases', () => {
    const result = documentSchemas.MODUL_AJAR.safeParse({
      ...sampleContent,
      deepLearningPhases: {
        ...sampleContent.deepLearningPhases,
        eksplorasi: sampleContent.deepLearningPhases.persiapan,
        aplikasi: sampleContent.deepLearningPhases.persiapan,
        refleksiEvaluasi: sampleContent.deepLearningPhases.persiapan
      },
      modulAjar: {
        pemahamanBermakna: 'Pemahaman',
        rangkumanMateri: 'Rangkuman',
        lkpdBlocks: [{ judul: 'LKPD', instruksi: 'Instruksi', langkah: 'Langkah', pertanyaan: 'Q' }],
        remedial: 'Remedial',
        pengayaan: 'Pengayaan',
        refleksiGuru: 'Refleksi Guru',
        refleksiPesertaDidik: 'Refleksi Siswa',
        glosarium: [{ istilah: 'Istilah', definisi: 'Definisi' }],
        daftarPustaka: [{ sitasi: 'Sitasi' }]
      }
    });
    expect(result.success).toBe(true);
  });
});
