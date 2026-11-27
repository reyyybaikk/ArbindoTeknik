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

const SITE_URL = 'https://arbindoteknik.my.id';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  icons: {
    icon: '/icon.png',
    apple: '/icon.png'
  },
  alternates: {
    canonical: SITE_URL
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_URL,
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
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'Spesialis servis mesin las inverter (MMA, TIG, MIG), modul inverter kulkas & mesin cuci, SMPS, dan power amplifier dengan garansi 14 hari.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Manggis No. 12, Landasan Ulin',
      addressLocality: 'Banjarbaru',
      addressRegion: 'Kalimantan Selatan',
      addressCountry: 'ID'
    },
    openingHours: 'Mo-Sa 09:00-18:00',
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
