'use client';

import { Activity, CheckCircle2, MapPin, MessageCircle, Search, ShieldCheck, Cpu } from 'lucide-react';
import Image from 'next/image';
import { buildWhatsAppLink } from '@/lib/api';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Kolom Kiri: Copywriting & Konversi */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-[11px] sm:text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>Workshop Landasan Ulin, Kota Banjarbaru</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2] sm:leading-[1.15]">
              Spesialis Perbaikan{' '}
              <span className="text-blue-600 dark:text-blue-500">Mesin Las Inverter</span>, Modul Inverter & Power Electronics
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Diagnosa presisi hingga level komponen PCB menggunakan alat ukur terkalibrasi. Melayani bengkel las, konstruksi, industri, hingga peralatan rumah tangga dengan garansi servis resmi 14 hari.
            </p>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href={buildWhatsAppLink() || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base shadow-sm transition"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span>Chat Teknisi via WhatsApp</span>
              </a>

              <a
                href="#cek-tiket"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 font-semibold text-sm sm:text-base transition"
              >
                <Search className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Lacak Status Servis</span>
              </a>
            </div>

            {/* Trust Metrics: 1 kolom di HP kecil, 3 kolom di layar sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 sm:pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex sm:block items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono font-bold text-base sm:text-xl text-slate-900 dark:text-white">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>14 Hari</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 sm:mt-0.5">Garansi Servis Resmi</p>
              </div>
              <div className="flex sm:block items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono font-bold text-base sm:text-xl text-slate-900 dark:text-white">
                  <Cpu className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>Level PCB</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 sm:mt-0.5">Analisa PWM & IGBT</p>
              </div>
              <div className="flex sm:block items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono font-bold text-base sm:text-xl text-slate-900 dark:text-white">
                  <Activity className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Uji Beban</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 sm:mt-0.5">Lolos Tes Kerja Penuh</p>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Visual Teknis Meja Servis */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 sm:p-3 shadow-lg">
              <div className="relative aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                <Image
                  src="/images/hero-workbench.jpg"
                  alt="Meja Kerja Diagnosa Elektronika Daya Arbindo Teknik"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/90 via-slate-900/40 to-transparent flex flex-col justify-end p-4 sm:p-5">
                  <span className="font-mono text-[11px] sm:text-xs text-blue-400 uppercase tracking-wider">
                    Component-Level Diagnostics
                  </span>
                  <p className="text-white font-bold text-sm sm:text-base mt-1 leading-snug">
                    Pengujian Sinyal Gate Drive PWM & Catu Daya Inverter
                  </p>
                </div>
              </div>

              {/* Floating Status Pill */}
              <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center justify-between gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-mono text-[11px] sm:text-xs font-medium text-slate-700 dark:text-slate-200 truncate">
                    Gate Drive PWM Verified • CT 15V/24V Stable
                  </span>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
                  PASS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}