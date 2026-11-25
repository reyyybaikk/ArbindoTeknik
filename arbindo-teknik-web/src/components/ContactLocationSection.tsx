'use client';

import { useState } from 'react';
import { Clock, ExternalLink, MapPin, Send } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/api';

export default function ContactLocationSection() {
  const [name, setName] = useState('');
  const [device, setDevice] = useState('');
  const [issue, setIssue] = useState('');

  const workshopAddress =
    process.env.NEXT_PUBLIC_WORKSHOP_ADDRESS ||
    'Landasan Ulin, Kota Banjarbaru, Kalimantan Selatan';

  const arbindoMapsLink =
    'https://www.google.com/maps/place/Arbindo+Teknik/@-3.4369351,114.7459433,884m/data=!3m2!1e3!4b1!4m6!3m5!1s0x2de6834e91d4519f:0xb0f71e26c5212a90!8m2!3d-3.4369351!4d114.7459433!16s%2Fg%2F11k8hjgfdz?entry=ttu&g_ep=EgoyMDI2MTEyMy4wIKXMDSoASAFQAw%3D%3D';

  const arbindoMapsEmbed =
    'https://maps.google.com/maps?q=Arbindo+Teknik&ll=-3.4369351,114.7459433&z=17&output=embed';

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappLink = buildWhatsAppLink([
      'Halo *Arbindo Teknik*, saya ingin konsultasi servis:',
      `• *Nama:* ${name || '-'}`,
      `• *Perangkat / Merek:* ${device || '-'}`,
      `• *Keluhan:* ${issue || '-'}`
    ].join('\n'));
    if (!whatsappLink) return;

    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="lokasi" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Kolom Kiri: Form Booking Cepat WhatsApp */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Konsultasi Cepat
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
              Kirim Detail Kerusakan ke Teknisi
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Isi rincian singkat perangkat Anda untuk mendapatkan estimasi awal sebelum unit diantar ke workshop.
            </p>

            <form onSubmit={handleSendWhatsApp} className="mt-6 space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Nama Anda / Bengkel
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Pak Budi / Bengkel Las Jaya"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label htmlFor="contact-device" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Jenis & Merek Perangkat
                </label>
                <input
                  id="contact-device"
                  type="text"
                  required
                  value={device}
                  onChange={(e) => setDevice(e.target.value)}
                  placeholder="Contoh: Mesin Las Ryu 120A / Modul Kulkas LG"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label htmlFor="contact-issue" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Gejala / Keluhan Kerusakan
                </label>
                <textarea
                  id="contact-issue"
                  rows={3}
                  required
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="Contoh: Lampu OC nyala terus, kipas hidup tapi tidak keluar api las"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition"
              >
                <Send className="w-4 h-4" />
                <span>Kirim ke WhatsApp Teknisi</span>
              </button>
            </form>
          </div>

          {/* Kolom Kanan: Info Workshop & Peta */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 flex flex-col justify-between shadow-xs space-y-6">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Workshop & Penerimaan Unit
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                Lokasi Arbindo Teknik
              </h2>

              <div className="mt-5 space-y-3.5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Alamat Bengkel</p>
                    <p className="text-slate-600 dark:text-slate-300">{workshopAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Jam Operasional</p>
                    <p className="text-slate-600 dark:text-slate-300">
                      Senin – Sabtu: 09.00 – 18.00 WITA (Konfirmasi WA sebelum antar unit)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="space-y-3">
              <div className="w-full h-56 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                <iframe
                  title="Peta Lokasi Arbindo Teknik Banjarbaru"
                  src={arbindoMapsEmbed}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <a
                href={arbindoMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>Buka Petunjuk Arah di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
