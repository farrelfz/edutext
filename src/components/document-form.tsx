'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const stepTemplate = {
  judulLangkah: '',
  tujuanLangkah: '',
  aktivitasGuru: '',
  aktivitasSiswa: '',
  waktu: '',
  media: '',
  mindful: {
    konteksMasalahNyata: '',
    pertanyaanPemantik: '',
    strategiKesadaran: ''
  },
  meaningful: {
    kaitanKehidupanNyata: '',
    konsepKunci: '',
    outputBermakna: ''
  },
  joyful: {
    aktivitasMenyenangkan: '',
    microReward: '',
    kolaborasi: ''
  }
};

export function DocumentForm() {
  const [docType, setDocType] = useState<'MODUL_AJAR' | 'RPP' | 'MODUL_PEMBELAJARAN'>('MODUL_AJAR');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [topic, setTopic] = useState('');
  const [status, setStatus] = useState<string>('');
  const [content, setContent] = useState<any>({
    identity: {
      subject: '',
      grade: '',
      topic: '',
      author: '',
      school: '',
      year: '',
      duration: ''
    },
    curriculum: {
      capaianPembelajaran: '',
      tujuanPembelajaran: '',
      profilPelajarPancasila: '',
      kompetensiAwal: ''
    },
    resources: {
      media: '',
      tools: '',
      references: ''
    },
    deepLearningPhases: {
      persiapan: [{ ...stepTemplate }],
      eksplorasi: [{ ...stepTemplate }],
      aplikasi: [{ ...stepTemplate }],
      refleksiEvaluasi: [{ ...stepTemplate }]
    },
    assessment: {
      formatif: '',
      sumatif: '',
      rubrik: [
        { kriteria: '', level4: '', level3: '', level2: '', level1: '' }
      ]
    },
    modulAjar: {
      pemahamanBermakna: '',
      rangkumanMateri: '',
      lkpdBlocks: [{ judul: '', instruksi: '', langkah: '', pertanyaan: '' }],
      remedial: '',
      pengayaan: '',
      refleksiGuru: '',
      refleksiPesertaDidik: '',
      glosarium: [{ istilah: '', definisi: '' }],
      daftarPustaka: [{ sitasi: '' }]
    },
    rpp: {
      materiRingkas: '',
      strategiKelas: '',
      penilaian: { teknik: '', instrumen: '', kriteriaKetuntasan: '' },
      catatanGuru: '',
      remedial: '',
      pengayaan: '',
      sumberBelajar: ''
    },
    modulPembelajaran: {
      petunjukBelajarMandiri: '',
      petaKonsep: '',
      uraianMateriLengkap: '',
      contohSoalBertahap: '',
      latihanSoal: '',
      evaluasiMandiri: '',
      rangkuman: '',
      glosarium: [{ istilah: '', definisi: '' }],
      daftarPustaka: [{ sitasi: '' }],
      optionalKunciJawabanGated: false,
      kunciJawaban: ''
    }
  });

  const updateField = (path: string, value: string | boolean) => {
    setContent((prev: any) => {
      const updated = structuredClone(prev);
      const keys = path.split('.').map((key) => (Number.isNaN(Number(key)) ? key : Number(key)));
      let current: any = updated;
      keys.slice(0, -1).forEach((key) => {
        current = current[key];
      });
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSubmit = async () => {
    setStatus('Saving...');
    const response = await fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        docType,
        title,
        subject,
        grade,
        topic,
        contentJson: content
      })
    });
    if (!response.ok) {
      const error = await response.json();
      setStatus(`Error: ${JSON.stringify(error)}`);
      return;
    }
    setStatus('Draft saved.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge>Doc Type</Badge>
        <Button className={docType === 'MODUL_AJAR' ? '' : 'bg-slate-100 text-slate-700'} onClick={() => setDocType('MODUL_AJAR')}>Modul Ajar</Button>
        <Button className={docType === 'RPP' ? '' : 'bg-slate-100 text-slate-700'} onClick={() => setDocType('RPP')}>RPP</Button>
        <Button className={docType === 'MODUL_PEMBELAJARAN' ? '' : 'bg-slate-100 text-slate-700'} onClick={() => setDocType('MODUL_PEMBELAJARAN')}>Modul Pembelajaran</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Judul" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <Input placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
        <Input placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
      </div>
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Identitas</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <Input placeholder="Mata Pelajaran" value={content.identity.subject} onChange={(e) => updateField('identity.subject', e.target.value)} />
          <Input placeholder="Kelas" value={content.identity.grade} onChange={(e) => updateField('identity.grade', e.target.value)} />
          <Input placeholder="Topik" value={content.identity.topic} onChange={(e) => updateField('identity.topic', e.target.value)} />
          <Input placeholder="Author" value={content.identity.author} onChange={(e) => updateField('identity.author', e.target.value)} />
          <Input placeholder="Sekolah" value={content.identity.school} onChange={(e) => updateField('identity.school', e.target.value)} />
          <Input placeholder="Tahun" value={content.identity.year} onChange={(e) => updateField('identity.year', e.target.value)} />
          <Input placeholder="Durasi" value={content.identity.duration} onChange={(e) => updateField('identity.duration', e.target.value)} />
        </div>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Curriculum & Goals</h3>
        <Textarea placeholder="Capaian Pembelajaran" value={content.curriculum.capaianPembelajaran} onChange={(e) => updateField('curriculum.capaianPembelajaran', e.target.value)} />
        <Textarea placeholder="Tujuan Pembelajaran" value={content.curriculum.tujuanPembelajaran} onChange={(e) => updateField('curriculum.tujuanPembelajaran', e.target.value)} />
        <Textarea placeholder="Profil Pelajar Pancasila" value={content.curriculum.profilPelajarPancasila} onChange={(e) => updateField('curriculum.profilPelajarPancasila', e.target.value)} />
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Resources</h3>
        <Input placeholder="Media" value={content.resources.media} onChange={(e) => updateField('resources.media', e.target.value)} />
        <Input placeholder="Tools" value={content.resources.tools} onChange={(e) => updateField('resources.tools', e.target.value)} />
        <Input placeholder="References" value={content.resources.references} onChange={(e) => updateField('resources.references', e.target.value)} />
      </section>
      {['persiapan', 'eksplorasi', 'aplikasi', 'refleksiEvaluasi'].map((phaseKey) => (
        <section key={phaseKey} className="space-y-3">
          <h3 className="text-base font-semibold">Deep Learning - {phaseKey}</h3>
          <Input placeholder="Judul Langkah" value={content.deepLearningPhases[phaseKey][0].judulLangkah} onChange={(e) => updateField(`deepLearningPhases.${phaseKey}.0.judulLangkah`, e.target.value)} />
          <Input placeholder="Tujuan Langkah" value={content.deepLearningPhases[phaseKey][0].tujuanLangkah} onChange={(e) => updateField(`deepLearningPhases.${phaseKey}.0.tujuanLangkah`, e.target.value)} />
          <Textarea placeholder="Aktivitas Guru" value={content.deepLearningPhases[phaseKey][0].aktivitasGuru} onChange={(e) => updateField(`deepLearningPhases.${phaseKey}.0.aktivitasGuru`, e.target.value)} />
          <Textarea placeholder="Aktivitas Siswa" value={content.deepLearningPhases[phaseKey][0].aktivitasSiswa} onChange={(e) => updateField(`deepLearningPhases.${phaseKey}.0.aktivitasSiswa`, e.target.value)} />
          <Input placeholder="Waktu" value={content.deepLearningPhases[phaseKey][0].waktu} onChange={(e) => updateField(`deepLearningPhases.${phaseKey}.0.waktu`, e.target.value)} />
          <Input placeholder="Media" value={content.deepLearningPhases[phaseKey][0].media} onChange={(e) => updateField(`deepLearningPhases.${phaseKey}.0.media`, e.target.value)} />
          <div className="grid gap-3 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-brand-600">Mindful</h4>
              <Textarea placeholder="Konteks Masalah Nyata" value={content.deepLearningPhases[phaseKey][0].mindful.konteksMasalahNyata} onChange={(e) => updateField(`deepLearningPhases.${phaseKey}.0.mindful.konteksMasalahNyata`, e.target.value)} />
              <Textarea placeholder="Pertanyaan Pemantik" value={content.deepLearningPhases[phaseKey][0].mindful.pertanyaanPemantik} onChange={(e) => updateField(`deepLearningPhases.${phaseKey}.0.mindful.pertanyaanPemantik`, e.target.value)} />
              <Textarea placeholder="Strategi Kesadaran" value={content.deepLearningPhases[phaseKey][0].mindful.strategiKesadaran} onChange={(e) => updateField(`deepLearningPhases.${phaseKey}.0.mindful.strategiKesadaran`, e.target.value)} />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-brand-600">Meaningful</h4>
              <Textarea placeholder="Kaitan Kehidupan Nyata" value={content.deepLearningPhases[phaseKey][0].meaningful.kaitanKehidupanNyata} onChange={(e) => updateField(`deepLearningPhases.${phaseKey}.0.meaningful.kaitanKehidupanNyata`, e.target.value)} />
              <Textarea placeholder="Konsep Kunci" value={content.deepLearningPhases[phaseKey][0].meaningful.konsepKunci} onChange={(e) => updateField(`deepLearningPhases.${phaseKey}.0.meaningful.konsepKunci`, e.target.value)} />
              <Textarea placeholder="Output Bermakna" value={content.deepLearningPhases[phaseKey][0].meaningful.outputBermakna} onChange={(e) => updateField(`deepLearningPhases.${phaseKey}.0.meaningful.outputBermakna`, e.target.value)} />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-brand-600">Joyful</h4>
              <Textarea placeholder="Aktivitas Menyenangkan" value={content.deepLearningPhases[phaseKey][0].joyful.aktivitasMenyenangkan} onChange={(e) => updateField(`deepLearningPhases.${phaseKey}.0.joyful.aktivitasMenyenangkan`, e.target.value)} />
              <Textarea placeholder="Micro Reward" value={content.deepLearningPhases[phaseKey][0].joyful.microReward} onChange={(e) => updateField(`deepLearningPhases.${phaseKey}.0.joyful.microReward`, e.target.value)} />
              <Textarea placeholder="Kolaborasi" value={content.deepLearningPhases[phaseKey][0].joyful.kolaborasi} onChange={(e) => updateField(`deepLearningPhases.${phaseKey}.0.joyful.kolaborasi`, e.target.value)} />
            </div>
          </div>
        </section>
      ))}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Assessment</h3>
        <Textarea placeholder="Formatif" value={content.assessment.formatif} onChange={(e) => updateField('assessment.formatif', e.target.value)} />
        <Textarea placeholder="Sumatif" value={content.assessment.sumatif} onChange={(e) => updateField('assessment.sumatif', e.target.value)} />
        <Textarea placeholder="Rubrik Kriteria" value={content.assessment.rubrik[0].kriteria} onChange={(e) => updateField('assessment.rubrik.0.kriteria', e.target.value)} />
        <Input placeholder="Level 4" value={content.assessment.rubrik[0].level4} onChange={(e) => updateField('assessment.rubrik.0.level4', e.target.value)} />
        <Input placeholder="Level 3" value={content.assessment.rubrik[0].level3} onChange={(e) => updateField('assessment.rubrik.0.level3', e.target.value)} />
        <Input placeholder="Level 2" value={content.assessment.rubrik[0].level2} onChange={(e) => updateField('assessment.rubrik.0.level2', e.target.value)} />
        <Input placeholder="Level 1" value={content.assessment.rubrik[0].level1} onChange={(e) => updateField('assessment.rubrik.0.level1', e.target.value)} />
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Doc Specific</h3>
        {docType === 'MODUL_AJAR' && (
          <>
            <Textarea placeholder="Pemahaman Bermakna" value={content.modulAjar.pemahamanBermakna} onChange={(e) => updateField('modulAjar.pemahamanBermakna', e.target.value)} />
            <Textarea placeholder="Rangkuman Materi" value={content.modulAjar.rangkumanMateri} onChange={(e) => updateField('modulAjar.rangkumanMateri', e.target.value)} />
            <Textarea placeholder="LKPD Judul" value={content.modulAjar.lkpdBlocks[0].judul} onChange={(e) => updateField('modulAjar.lkpdBlocks.0.judul', e.target.value)} />
          </>
        )}
        {docType === 'RPP' && (
          <>
            <Textarea placeholder="Materi Ringkas" value={content.rpp.materiRingkas} onChange={(e) => updateField('rpp.materiRingkas', e.target.value)} />
            <Textarea placeholder="Strategi Kelas" value={content.rpp.strategiKelas} onChange={(e) => updateField('rpp.strategiKelas', e.target.value)} />
            <Textarea placeholder="Teknik Penilaian" value={content.rpp.penilaian.teknik} onChange={(e) => updateField('rpp.penilaian.teknik', e.target.value)} />
          </>
        )}
        {docType === 'MODUL_PEMBELAJARAN' && (
          <>
            <Textarea placeholder="Petunjuk Belajar Mandiri" value={content.modulPembelajaran.petunjukBelajarMandiri} onChange={(e) => updateField('modulPembelajaran.petunjukBelajarMandiri', e.target.value)} />
            <Textarea placeholder="Uraian Materi Lengkap" value={content.modulPembelajaran.uraianMateriLengkap} onChange={(e) => updateField('modulPembelajaran.uraianMateriLengkap', e.target.value)} />
          </>
        )}
      </section>
      <div className="flex items-center gap-4">
        <Button onClick={handleSubmit}>Save Draft</Button>
        {status && <span className="text-sm text-slate-600">{status}</span>}
      </div>
    </div>
  );
}
