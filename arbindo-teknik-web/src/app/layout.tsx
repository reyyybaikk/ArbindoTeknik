import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Arbindo Teknik — Spesialis Servis Mesin Las Inverter & Power Electronics Banjarbaru',
  description:
    'Bengkel spesialis perbaikan mesin las inverter (MMA, TIG, MIG), modul inverter kulkas & mesin cuci, SMPS, dan power amplifier di Landasan Ulin, Banjarbaru. Garansi resmi 14 hari.',
  keywords: [
    'Servis Mesin Las Inverter Banjarbaru',
    'Perbaikan Modul Inverter Kulkas Landasan Ulin',
    'Bengkel Elektronika Daya Kalimantan Selatan',
    'Arbindo Teknik'
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-[#090D16] dark:text-slate-100 transition-colors duration-200"
      >
        {children}
      </body>
    </html>
  );
}