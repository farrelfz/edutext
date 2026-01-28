import { prisma } from '../src/lib/db';

const baseContent = {
  identity: {
    subject: 'Matematika',
    grade: '5',
    topic: 'Pecahan',
    author: 'Guru Demo',
    school: 'SD Nusantara',
    year: '2024',
    duration: '2 JP'
  },
  curriculum: {
    capaianPembelajaran: 'Memahami konsep pecahan dalam konteks sehari-hari.',
    tujuanPembelajaran: 'Siswa mampu menjelaskan dan mempraktikkan pecahan.',
    profilPelajarPancasila: 'Bernalar kritis, gotong royong.',
    kompetensiAwal: 'Penjumlahan dan pengurangan dasar.'
  },
  resources: {
    media: 'Kartu pecahan, video interaktif',
    tools: 'LCD, papan tulis',
    references: 'Buku Matematika Kelas 5'
  },
  deepLearningPhases: {
    persiapan: [
      {
        judulLangkah: 'Konteks awal',
        tujuanLangkah: 'Membangun minat',
        aktivitasGuru: 'Menampilkan contoh pizza',
        aktivitasSiswa: 'Menyebutkan bagian pecahan',
        waktu: '10 menit',
        media: 'Gambar',
        mindful: {
          konteksMasalahNyata: 'Membagi makanan bersama',
          pertanyaanPemantik: 'Bagaimana membagi adil?',
          strategiKesadaran: 'Diskusi reflektif'
        },
        meaningful: {
          kaitanKehidupanNyata: 'Berbagi di rumah',
          konsepKunci: 'Pembagian setara',
          outputBermakna: 'Contoh pembagian'
        },
        joyful: {
          aktivitasMenyenangkan: 'Game membagi kue',
          microReward: 'Poin kelompok',
          kolaborasi: 'Kerja tim'
        }
      }
    ],
    eksplorasi: [
      {
        judulLangkah: 'Eksperimen pecahan',
        tujuanLangkah: 'Memahami representasi',
        aktivitasGuru: 'Menyediakan kartu',
        aktivitasSiswa: 'Mencocokkan kartu',
        waktu: '20 menit',
        media: 'Kartu pecahan',
        mindful: {
          konteksMasalahNyata: 'Membaca resep',
          pertanyaanPemantik: 'Bagaimana mengukur?',
          strategiKesadaran: 'Jurnal singkat'
        },
        meaningful: {
          kaitanKehidupanNyata: 'Memasak',
          konsepKunci: 'Representasi pecahan',
          outputBermakna: 'Lembar kerja'
        },
        joyful: {
          aktivitasMenyenangkan: 'Puzzle pecahan',
          microReward: 'Stiker',
          kolaborasi: 'Pasangan'
        }
      }
    ],
    aplikasi: [
      {
        judulLangkah: 'Latihan soal',
        tujuanLangkah: 'Menerapkan konsep',
        aktivitasGuru: 'Memberi soal',
        aktivitasSiswa: 'Mengerjakan soal',
        waktu: '20 menit',
        media: 'Lembar latihan',
        mindful: {
          konteksMasalahNyata: 'Belanja buah',
          pertanyaanPemantik: 'Berapa bagian?',
          strategiKesadaran: 'Refleksi cepat'
        },
        meaningful: {
          kaitanKehidupanNyata: 'Belanja',
          konsepKunci: 'Operasi pecahan',
          outputBermakna: 'Jawaban tertulis'
        },
        joyful: {
          aktivitasMenyenangkan: 'Quiz cepat',
          microReward: 'Badge digital',
          kolaborasi: 'Kelompok kecil'
        }
      }
    ],
    refleksiEvaluasi: [
      {
        judulLangkah: 'Refleksi',
        tujuanLangkah: 'Evaluasi pemahaman',
        aktivitasGuru: 'Memimpin refleksi',
        aktivitasSiswa: 'Menuliskan kesimpulan',
        waktu: '10 menit',
        media: 'Lembar refleksi',
        mindful: {
          konteksMasalahNyata: 'Kegiatan sehari-hari',
          pertanyaanPemantik: 'Apa yang dipelajari?',
          strategiKesadaran: 'Refleksi diri'
        },
        meaningful: {
          kaitanKehidupanNyata: 'Penggunaan pecahan',
          konsepKunci: 'Pemahaman akhir',
          outputBermakna: 'Catatan refleksi'
        },
        joyful: {
          aktivitasMenyenangkan: 'Sharing circle',
          microReward: 'Apresiasi',
          kolaborasi: 'Berbagi pasangan'
        }
      }
    ]
  },
  assessment: {
    formatif: 'Observasi diskusi',
    sumatif: 'Tes akhir topik',
    rubrik: [
      {
        kriteria: 'Pemahaman konsep',
        level4: 'Sangat baik',
        level3: 'Baik',
        level2: 'Cukup',
        level1: 'Perlu bimbingan'
      }
    ]
  }
};

async function main() {
  await prisma.plan.createMany({
    data: [
      { id: 'starter', name: 'Starter', downloads: 10, priceIdr: 129000, isActive: true },
      { id: 'pro', name: 'Pro', downloads: 50, priceIdr: 399000, isActive: true },
      { id: 'school', name: 'School', downloads: 200, priceIdr: 1500000, isActive: true }
    ],
    skipDuplicates: true
  });

  const user = await prisma.user.upsert({
    where: { email: 'demo@edutext.id' },
    update: {},
    create: {
      email: 'demo@edutext.id',
      name: 'Demo Teacher'
    }
  });

  await prisma.document.createMany({
    data: [
      {
        userId: user.id,
        docType: 'MODUL_AJAR',
        title: 'Modul Ajar Pecahan',
        subject: 'Matematika',
        grade: '5',
        topic: 'Pecahan',
        contentJson: {
          ...baseContent,
          modulAjar: {
            pemahamanBermakna: 'Pecahan membantu memahami pembagian adil.',
            rangkumanMateri: 'Ringkasan pecahan dasar.',
            lkpdBlocks: [{ judul: 'LKPD 1', instruksi: 'Kerjakan', langkah: 'Diskusikan', pertanyaan: 'Apa itu pecahan?' }],
            remedial: 'Latihan tambahan',
            pengayaan: 'Proyek mini',
            refleksiGuru: 'Catatan guru',
            refleksiPesertaDidik: 'Catatan siswa',
            glosarium: [{ istilah: 'Pecahan', definisi: 'Bagian dari keseluruhan' }],
            daftarPustaka: [{ sitasi: 'Buku Matematika 5' }]
          }
        }
      },
      {
        userId: user.id,
        docType: 'RPP',
        title: 'RPP Pecahan',
        subject: 'Matematika',
        grade: '5',
        topic: 'Pecahan',
        contentJson: {
          ...baseContent,
          rpp: {
            materiRingkas: 'Materi ringkas pecahan',
            strategiKelas: 'Diskusi, presentasi',
            penilaian: { teknik: 'Observasi', instrumen: 'Rubrik', kriteriaKetuntasan: '75' },
            catatanGuru: 'Catatan pelaksanaan',
            remedial: 'Tugas tambahan',
            pengayaan: 'Proyek kelompok',
            sumberBelajar: 'Buku paket'
          }
        }
      },
      {
        userId: user.id,
        docType: 'MODUL_PEMBELAJARAN',
        title: 'Modul Pembelajaran Pecahan',
        subject: 'Matematika',
        grade: '5',
        topic: 'Pecahan',
        contentJson: {
          ...baseContent,
          modulPembelajaran: {
            petunjukBelajarMandiri: 'Baca dan kerjakan latihan.',
            petaKonsep: 'Peta konsep pecahan.',
            uraianMateriLengkap: 'Materi lengkap pecahan.',
            contohSoalBertahap: 'Contoh soal bertahap.',
            latihanSoal: 'Latihan soal.',
            evaluasiMandiri: 'Evaluasi mandiri.',
            rangkuman: 'Rangkuman pecahan.',
            glosarium: [{ istilah: 'Pecahan', definisi: 'Bagian dari keseluruhan' }],
            daftarPustaka: [{ sitasi: 'Buku Matematika 5' }],
            optionalKunciJawabanGated: false,
            kunciJawaban: ''
          }
        }
      }
    ]
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
