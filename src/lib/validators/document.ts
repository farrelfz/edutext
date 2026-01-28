import { z } from 'zod';

const mindfulSchema = z.object({
  konteksMasalahNyata: z.string().min(1),
  pertanyaanPemantik: z.string().min(1),
  strategiKesadaran: z.string().min(1)
});

const meaningfulSchema = z.object({
  kaitanKehidupanNyata: z.string().min(1),
  konsepKunci: z.string().min(1),
  outputBermakna: z.string().min(1)
});

const joyfulSchema = z.object({
  aktivitasMenyenangkan: z.string().min(1),
  microReward: z.string().min(1),
  kolaborasi: z.string().min(1)
});

export const deepLearningStepSchema = z.object({
  judulLangkah: z.string().min(1),
  tujuanLangkah: z.string().min(1),
  aktivitasGuru: z.string().min(1),
  aktivitasSiswa: z.string().min(1),
  waktu: z.string().min(1),
  media: z.string().min(1),
  mindful: mindfulSchema,
  meaningful: meaningfulSchema,
  joyful: joyfulSchema
});

const baseSchema = z.object({
  identity: z.object({
    subject: z.string().min(1),
    grade: z.string().min(1),
    topic: z.string().min(1),
    author: z.string().min(1),
    school: z.string().min(1),
    year: z.string().min(1),
    duration: z.string().min(1)
  }),
  curriculum: z.object({
    capaianPembelajaran: z.string().min(1),
    tujuanPembelajaran: z.string().min(1),
    profilPelajarPancasila: z.string().optional(),
    kompetensiAwal: z.string().optional()
  }),
  resources: z.object({
    media: z.string().min(1),
    tools: z.string().min(1),
    references: z.string().min(1)
  }),
  deepLearningPhases: z.object({
    persiapan: z.array(deepLearningStepSchema).min(1),
    eksplorasi: z.array(deepLearningStepSchema).min(1),
    aplikasi: z.array(deepLearningStepSchema).min(1),
    refleksiEvaluasi: z.array(deepLearningStepSchema).min(1)
  }),
  assessment: z.object({
    formatif: z.string().min(1),
    sumatif: z.string().min(1),
    rubrik: z.array(
      z.object({
        kriteria: z.string().min(1),
        level4: z.string().min(1),
        level3: z.string().min(1),
        level2: z.string().min(1),
        level1: z.string().min(1)
      })
    )
  })
});

const modulAjarSchema = baseSchema.extend({
  modulAjar: z.object({
    pemahamanBermakna: z.string().min(1),
    rangkumanMateri: z.string().min(1),
    lkpdBlocks: z.array(
      z.object({
        judul: z.string().min(1),
        instruksi: z.string().min(1),
        langkah: z.string().min(1),
        pertanyaan: z.string().min(1)
      })
    ),
    remedial: z.string().min(1),
    pengayaan: z.string().min(1),
    refleksiGuru: z.string().min(1),
    refleksiPesertaDidik: z.string().min(1),
    glosarium: z.array(
      z.object({
        istilah: z.string().min(1),
        definisi: z.string().min(1)
      })
    ),
    daftarPustaka: z.array(
      z.object({
        sitasi: z.string().min(1)
      })
    )
  })
});

const rppSchema = baseSchema.extend({
  rpp: z.object({
    materiRingkas: z.string().min(1),
    strategiKelas: z.string().min(1),
    penilaian: z.object({
      teknik: z.string().min(1),
      instrumen: z.string().min(1),
      kriteriaKetuntasan: z.string().min(1)
    }),
    catatanGuru: z.string().min(1),
    remedial: z.string().min(1),
    pengayaan: z.string().min(1),
    sumberBelajar: z.string().min(1)
  })
});

const modulPembelajaranSchema = baseSchema.extend({
  modulPembelajaran: z.object({
    petunjukBelajarMandiri: z.string().min(1),
    petaKonsep: z.string().min(1),
    uraianMateriLengkap: z.string().min(1),
    contohSoalBertahap: z.string().min(1),
    latihanSoal: z.string().min(1),
    evaluasiMandiri: z.string().min(1),
    rangkuman: z.string().min(1),
    glosarium: z.array(
      z.object({
        istilah: z.string().min(1),
        definisi: z.string().min(1)
      })
    ),
    daftarPustaka: z.array(
      z.object({
        sitasi: z.string().min(1)
      })
    ),
    optionalKunciJawabanGated: z.boolean(),
    kunciJawaban: z.string().optional()
  })
});

export const documentSchemas = {
  MODUL_AJAR: modulAjarSchema,
  RPP: rppSchema,
  MODUL_PEMBELAJARAN: modulPembelajaranSchema
};

export type DocumentContent = z.infer<typeof modulAjarSchema> |
  z.infer<typeof rppSchema> |
  z.infer<typeof modulPembelajaranSchema>;
