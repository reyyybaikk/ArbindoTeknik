'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, Moon, Sun, Wrench, X, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/api';

const NAV_LINKS = [
  { label: 'Layanan', href: '#layanan' },
  { label: 'Studi Kasus', href: '#portofolio' },
  { label: 'Cek Tiket', href: '#cek-tiket' },
  { label: 'Alur & Garansi', href: '#alur-kerja' },
  { label: 'Lokasi', href: '#lokasi' }
];

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('arbindo_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && prefersDark);
    document.documentElement.classList.toggle('dark', isDark);
    const frame = window.requestAnimationFrame(() => setDarkMode(isDark));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('arbindo_theme', next ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800 bg-white/85 dark:bg-[#090D16]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm overflow-hidden">
            {!logoError ? (
              <Image
                src="/images/logo-arbindo.png"
                alt="Logo Arbindo Teknik"
                width={40}
                height={40}
                className="w-full h-full object-contain p-1"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-full h-full bg-blue-600 text-white flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
            )}
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white block leading-none">
              Arbindo<span className="text-blue-600 dark:text-blue-500">Teknik</span>
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-slate-500 dark:text-slate-400">
              Power Electronics
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href={buildWhatsAppLink() || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Konsultasi WA</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            className="lg:hidden w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090D16] px-4 py-4 space-y-2">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {item.label}
            </a>
          ))}
          <a
            href={buildWhatsAppLink() || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Konsultasi via WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
}