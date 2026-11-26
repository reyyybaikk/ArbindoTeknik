'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Wrench } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/api';

export default function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <>
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070A11] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-xs overflow-hidden">
              {!logoError ? (
                <Image
                  src="/images/logo-arbindo.png"
                  alt="Logo Arbindo Teknik"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain p-1"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-full h-full bg-blue-600 text-white flex items-center justify-center">
                  <Wrench className="w-4 h-4" />
                </div>
              )}
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white block leading-none">
                Arbindo<span className="text-blue-600 dark:text-blue-500">Teknik</span>
              </span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-slate-500 dark:text-slate-400">
                Power Electronics
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            © 2026 Arbindo Teknik Banjarbaru. Spesialis Elektronika Daya & Inverter.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button (Mobile) */}
      <a
        href={buildWhatsAppLink() || undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Arbindo Teknik"
        className="sm:hidden fixed bottom-4 right-4 z-40 w-12 h-12 rounded-full bg-emerald-600/95 hover:bg-emerald-700 text-white shadow-lg flex items-center justify-center transition"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </>
  );
}