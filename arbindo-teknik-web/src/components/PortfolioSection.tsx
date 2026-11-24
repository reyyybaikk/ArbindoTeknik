'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Cpu, Wrench, X } from 'lucide-react';
import { CASE_STUDIES_DATA } from '@/data/portfolios';
import { fetchPublicPortfolios } from '@/lib/api';
import { CaseStudy, PortfolioCategory } from '@/types';

const CATEGORIES: PortfolioCategory[] = [
  'Semua Kasus',
  'Mesin Las Inverter',
  'Modul Inverter',
  'SMPS & Modifikasi'
];

// Normalisasi link Google Drive agar anti-blokir hotlink di tag <img>
function normalizeImageUrl(rawUrl?: string): string {
  const url = String(rawUrl || '').trim();
  if (!url) return '';
  const match = url.match(/[-\w]{25,}/);
  if ((url.includes('drive.google.com') || url.includes('googleusercontent.com')) && match) {
    return `https://drive.google.com/thumbnail?id=${match[0]}&sz=w1000`;
  }
  return url;
}

export default function PortfolioSection() {
  const [cases, setCases] = useState<CaseStudy[]>(CASE_STUDIES_DATA);
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>('Semua Kasus');
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let mounted = true;
    fetchPublicPortfolios().then((items) => {
      if (mounted && items.length > 0) {
        setCases(items);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!activeCase) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveCase(null);
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousActiveElement?.focus();
    };
  }, [activeCase]);

  const filteredCases =
    selectedCategory === 'Semua Kasus'
      ? cases
      : cases.filter((item) => item.category === selectedCategory);

  const markImageFailed = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="portofolio" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Rekam Jejak Teknis
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Dokumentasi Kasus Perbaikan
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              Studi kasus nyata perbaikan komponen dan modifikasi sistem di meja kerja Arbindo Teknik.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    active
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Kartu Studi Kasus */}
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((item) => {
            const imgSrc = normalizeImageUrl(item.imageUrl);
            const showImage = Boolean(imgSrc) && !failedImages[item.id];

            return (
              <article
                key={item.id}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden flex flex-col justify-between hover:border-blue-400 dark:hover:border-blue-600 transition shadow-xs"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden flex items-center justify-center">
                    {showImage ? (
                      <Image
                        src={imgSrc}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        onError={() => markImageFailed(item.id)}
                      />
                    ) : (
                      <Cpu className="w-10 h-10 text-slate-700" />
                    )}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-xs text-white text-xs font-medium border border-white/10">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5">
                    {item.brand && item.brand !== '-' && (
                      <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {item.brand}
                      </span>
                    )}
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug mt-0.5">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                      <strong className="text-slate-800 dark:text-slate-200">Gejala:</strong> {item.symptom}
                    </p>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                      <strong className="text-slate-800 dark:text-slate-200">Tindakan:</strong> {item.solution}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 min-w-0">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.testResult || 'Lulus Uji Beban'}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveCase(item)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                  >
                    <span>Detail Teknis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Modal Detail Teknis */}
      {activeCase && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveCase(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-detail-title"
            className="max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  {activeCase.category} • {activeCase.brand}
                </span>
                <h3 id="case-detail-title" className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {activeCase.title}
                </h3>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setActiveCase(null)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Tutup detail teknis"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Foto Dokumentasi di Modal */}
            {normalizeImageUrl(activeCase.imageUrl) && !failedImages[activeCase.id] && (
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800">
                <Image
                  src={normalizeImageUrl(activeCase.imageUrl)}
                  alt={activeCase.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 576px"
                  className="w-full h-full object-cover"
                  onError={() => markImageFailed(activeCase.id)}
                />
              </div>
            )}

            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70">
                <p className="font-bold text-slate-900 dark:text-white mb-1">1. Keluhan & Gejala Awal</p>
                <p>{activeCase.symptom}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70">
                <p className="font-bold text-slate-900 dark:text-white mb-1">2. Hasil Diagnosa Pengukuran</p>
                <p>{activeCase.diagnosis}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70">
                <p className="font-bold text-slate-900 dark:text-white mb-1">3. Tindakan Perbaikan</p>
                <p>{activeCase.solution}</p>
              </div>

              {activeCase.componentsReplaced.length > 0 && (
                <div>
                  <p className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                    <Wrench className="w-4 h-4 text-blue-600" />
                    <span>Komponen Diganti / Dimodifikasi:</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeCase.componentsReplaced.map((comp) => (
                      <span
                        key={comp}
                        className="font-mono text-xs px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>{activeCase.testResult}</span>
              </span>
              <button
                type="button"
                onClick={() => setActiveCase(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}