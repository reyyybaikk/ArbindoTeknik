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
  metadataBase: new URL('https://arbindo-teknik.vercel.app'),
  title: {
    default: 'Arbindo Teknik — Spesialis Servis Mesin Las Inverter & Power Electronics Banjarbaru',
    template: '%s | Arbindo Teknik'
  },
  description:
    'Bengkel spesialis perbaikan mesin las inverter (MMA, TIG, MIG), modul inverter kulkas & mesin cuci, SMPS, dan power amplifier di Landasan Ulin, Banjarbaru. Garansi resmi 14 hari.',
  keywords: [
    'Servis Mesin Las Inverter Banjarbaru',
    'Servis Mesin Las Banjarmasin',
    'Perbaikan Modul Inverter Kulkas Landasan Ulin',
    'Servis Modul Mesin Cuci Inverter Banjarbaru',
    'Bengkel Elektronika Daya Kalimantan Selatan',
    'Arbindo Teknik'
  ],
  alternates: {
    canonical: 'https://arbindo-teknik.vercel.app'
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://arbindo-teknik.vercel.app',
    siteName: 'Arbindo Teknik',
    title: 'Arbindo Teknik — Spesialis Servis Mesin Las Inverter & Power Electronics',
    description:
      'Perbaikan mesin las inverter (MMA, TIG, MIG), modul PCB inverter kulkas & mesin cuci, SMPS, dan audio amplifier di Landasan Ulin, Banjarbaru. Bergaransi 14 hari.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  verification: {
    // Tempelkan kode verifikasi dari Google Search Console di sini (tanpa tag <meta>)
    google: '_ELZWpKPQ_C9sdPkoKT2MIIuNJkcxEAxKgAbS6J-wV0'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Arbindo Teknik',
    url: 'https://arbindo-teknik.vercel.app',
    description:
      'Spesialis servis mesin las inverter (MMA, TIG, MIG), modul inverter kulkas & mesin cuci, SMPS, dan power amplifier dengan garansi 14 hari.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Landasan Ulin, Banjarbaru',
      addressRegion: 'Kalimantan Selatan',
      addressCountry: 'ID'
    },
    areaServed: ['Banjarbaru', 'Landasan Ulin', 'Banjarmasin', 'Martapura', 'Kalimantan Selatan']
  };

  return (
    <html lang="id" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-[#090D16] dark:text-slate-100 transition-colors duration-200"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}