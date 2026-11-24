import { ClipboardCheck, Gauge, ShieldCheck, Wrench } from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    num: '01',
    title: 'Penerimaan & Tiket Servis',
    desc: 'Unit dicatat ke sistem workshop dan pelanggan menerima nomor tiket (TKT-XXXXX) untuk pemantauan progres.',
    icon: <ClipboardCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
  },
  {
    num: '02',
    title: 'Diagnosa & Konfirmasi Biaya',
    desc: 'Pengukuran titik tegangan/komponen rusak dilakukan terlebih dahulu, lalu estimasi biaya dikonfirmasi sebelum eksekusi.',
    icon: <Gauge className="w-5 h-5 text-blue-600 dark:text-blue-400" />
  },
  {
    num: '03',
    title: 'Perbaikan & Uji Beban Penuh',
    desc: 'Penggantian part spesifikasi asli/ekuivalen, pengaman series test bulb, serta pengujian beban kerja aktual.',
    icon: <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />
  },
  {
    num: '04',
    title: 'Serah Terima & Garansi 14 Hari',
    desc: 'Unit diserahkan beserta invoice resmi dengan perlindungan garansi servis 14 hari kalender untuk keluhan yang sama.',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
  }
];

export default function WorkflowSection() {
  return (
    <section id="alur-kerja" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Standar Operasional
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Alur Pengerjaan Transparan & Bergaransi
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Tanpa biaya tersembunyi — setiap penggantian komponen dikonfirmasi terlebih dahulu kepada pemilik unit.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKFLOW_STEPS.map((item) => (
            <div
              key={item.num}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-mono text-sm font-bold text-slate-400 dark:text-slate-500">
                    {item.num}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}