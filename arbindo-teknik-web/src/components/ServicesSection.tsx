import { BatteryCharging, Cpu, Volume2, Zap } from 'lucide-react';
import { SERVICES_DATA } from '@/data/portfolios';
import { ServiceItem } from '@/types';

const ICON_MAP: Record<ServiceItem['iconName'], React.ReactNode> = {
  zap: <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
  cpu: <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
  'battery-charging': <BatteryCharging className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
  'volume-2': <Volume2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
};

export default function ServicesSection() {
  return (
    <section id="layanan" className="py-20 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Bidang Keahlian
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Layanan Perbaikan Elektronika Daya & Inverter
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Penanganan terfokus pada sistem switching daya tinggi dan papan kendali elektronik berbagai merek.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 sm:p-7 hover:border-blue-400 dark:hover:border-blue-600 transition shadow-xs"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900 flex items-center justify-center shrink-0">
                  {ICON_MAP[service.iconName]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{service.title}</h3>
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                    {service.subtitle}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {service.description}
              </p>

              {/* Merek yang ditangani */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  Merek Umum Ditangani:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {service.brands.map((brand) => (
                    <span
                      key={brand}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tag Teknis */}
              <div className="mt-3 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/70 dark:border-blue-800/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}