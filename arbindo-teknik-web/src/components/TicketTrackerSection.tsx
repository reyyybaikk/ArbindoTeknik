'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Search, Ticket } from 'lucide-react';
import { trackServiceTicket } from '@/lib/api';
import { TicketInfo } from '@/types';

const STEPS = [
  { step: 1, title: 'Diagnosa', desc: 'Pemeriksaan PCB & ukur komponen' },
  { step: 2, title: 'Pengerjaan / Part', desc: 'Penggantian komponen & kalibrasi' },
  { step: 3, title: 'Selesai & Uji Beban', desc: 'Unit siap diambil di workshop' },
  { step: 4, title: 'Lunas & Garansi', desc: 'Serah terima & garansi 14 hari' }
];

export default function TicketTrackerSection() {
  const [ticketInput, setTicketInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [ticketData, setTicketData] = useState<TicketInfo | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketInput.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setTicketData(null);

    const res = await trackServiceTicket(ticketInput);
    setLoading(false);

    if (res.success && res.ticket) {
      setTicketData(res.ticket);
    } else {
      setErrorMsg(res.message || 'Tiket tidak ditemukan.');
    }
  };

  return (
    <section id="cek-tiket" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-blue-200 dark:border-blue-900/80 bg-gradient-to-br from-blue-50/80 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/30 p-6 sm:p-10 shadow-sm">
          <div className="text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 dark:text-blue-400 font-mono text-xs font-semibold">
              <Ticket className="w-3.5 h-3.5" />
              <span>LIVE WORKSHOP TRACKER</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Cek Status Perbaikan Unit Anda
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Masukkan nomor tiket yang tertera pada tanda terima servis (contoh: <span className="font-mono font-semibold">TKT-48291</span>) untuk melihat progres pengerjaan secara langsung.
            </p>
          </div>

          {/* Form Pencarian */}
          <form onSubmit={handleTrack} className="mt-7 max-w-lg mx-auto flex flex-col sm:flex-row gap-3">
            <input
              id="ticket-number"
              type="text"
              aria-label="Nomor tiket servis"
              value={ticketInput}
              onChange={(e) => setTicketInput(e.target.value.toUpperCase())}
              placeholder="Contoh: TKT-48291"
              className="flex-1 px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm transition shadow-xs"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>{loading ? 'Mencari...' : 'Cek Progres'}</span>
            </button>
          </form>

          {/* Pesan Loading */}
          {loading && (
            <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
              Menghubungkan ke server workshop, mohon tunggu beberapa detik...
            </p>
          )}

          {/* Pesan Error */}
          {errorMsg && (
            <div className="mt-6 max-w-lg mx-auto p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 flex items-center gap-3 text-rose-700 dark:text-rose-300 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Hasil Pelacakan */}
          {ticketData && (
            <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    Nomor Tiket: <strong className="text-blue-600 dark:text-blue-400">{ticketData.id}</strong> • Masuk: {ticketData.created_at}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    {ticketData.device_model}
                  </h3>
                </div>
                <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {ticketData.status}
                </span>
              </div>

              {/* 4-Step Visual Progress */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STEPS.map((s) => {
                  const isCompleted = ticketData.step >= s.step;
                  const isCurrent = ticketData.step === s.step;
                  return (
                    <div
                      key={s.step}
                      className={`p-3.5 rounded-xl border transition ${
                        isCurrent
                          ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40'
                          : isCompleted
                          ? 'border-emerald-200 dark:border-emerald-900/70 bg-emerald-50/40 dark:bg-emerald-950/20'
                          : 'border-slate-200 dark:border-slate-800 opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                          0{s.step}
                        </span>
                        {isCompleted && (
                          <CheckCircle2
                            className={`w-4 h-4 ${isCurrent ? 'text-blue-600' : 'text-emerald-500'}`}
                          />
                        )}
                      </div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{s.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        {s.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white">Keterangan:</strong> {ticketData.note}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}