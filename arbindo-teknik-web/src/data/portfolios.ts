import { CaseStudy, ServiceItem } from '@/types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'welding-inverter',
    title: 'Mesin Las Inverter (MMA / TIG / MIG)',
    subtitle: 'Perbaikan Blok Power, Gate Driver & Sistem Proteksi',
    description:
      'Penanganan kerusakan mati total, lampu indikator OC menyala terus, tidak keluar api las, PWM tidak bekerja, hingga modifikasi kontrol wire feeder MIG.',
    brands: ['Ryu', 'Kobewel', 'Rhino', 'Maxtron', 'Caldwell', 'Lakoni', 'Firman'],
    tags: ['IGBT & MOSFET', 'PWM SG3525 / UC3846', 'Gate Drive 15V/24V'],
    iconName: 'zap'
  },
  {
    id: 'home-appliance-inverter',
    title: 'Modul Inverter Kulkas & Mesin Cuci',
    subtitle: 'Analisa PCB Kontrol & Driver Kompresor IPM',
    description:
      'Perbaikan modul inverter gagal start kompresor, kode error komunikasi/IPM, jalur sensor putus, maupun kerusakan akibat lonjakan tegangan listrik PLN.',
    brands: ['LG Smart Inverter', 'Samsung', 'Sharp', 'Aqua', 'Polytron', 'Electrolux'],
    tags: ['Modul IPM', 'Sensor Arus & Suhu', 'Regulator SMPS PCB'],
    iconName: 'cpu'
  },
  {
    id: 'smps-industrial',
    title: 'SMPS Industri & Driver Treadmill',
    subtitle: 'Rekondisi Power Supply Daya Tinggi & Kontrol Motor',
    description:
      'Perbaikan Switch-Mode Power Supply tegangan tinggi, board kontrol treadmill elektrik mati total/error E01-E07, serta konversi catu daya linier presisi.',
    brands: ['MeanWell', 'Kinetic Treadmill', 'Sanken', 'Custom Industrial PSU'],
    tags: ['MOSFET Daya', 'Optocoupler Feedback', 'Konversi Trafo Linier'],
    iconName: 'battery-charging'
  },
  {
    id: 'audio-amplifier',
    title: 'Audio Power Amplifier & Custom Mod',
    subtitle: 'Penguat Daya Kelas AB/D & Sistem Proteksi Speaker',
    description:
      'Perbaikan power amplifier lapangan maupun aktif, perbaikan rangkaian proteksi DC offset, serta upgrade catu daya untuk kestabilan beban rendah.',
    brands: ['Sharp CBOX', 'Yamaha', 'BMB', 'Rakitan Sound System'],
    tags: ['Transistor Final', 'Relay Protector', 'Catu Daya Simetris'],
    iconName: 'volume-2'
  }
];

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'case-01',
    title: 'Kobewel S160i — Mati Total & Blok MOSFET Short',
    category: 'Mesin Las Inverter',
    brand: 'Kobewel S160i',
    imageUrl: '',
    symptom: 'Unit mati total dan MCB listrik langsung turun saat saklar utama dinyalakan.',
    diagnosis:
      'Ditemukan 4 unit MOSFET daya pada blok inverter mengalami hubung singkat (short) disertai resistor gate driver putus dan suplai bantu 24V drop.',
    solution:
      'Penggantian satu set MOSFET baru yang terkalibrasi, perbaikan jalur gate drive PWM, dan pengujian awal menggunakan series test bulb 200W sebelum uji beban kawat las.',
    componentsReplaced: ['MOSFET 20N60 (4 pcs)', 'Resistor Gate 10 Ohm', 'Dioda Zener 18V'],
    testResult: 'Lulus Uji Beban Kawat 2.6mm & 3.2mm'
  },
  {
    id: 'case-02',
    title: 'Modul Kulkas LG Smart Inverter — Kompresor Gagal Start',
    category: 'Modul Inverter',
    brand: 'LG Inverter PCB',
    imageUrl: '',
    symptom: 'Lampu dalam kulkas menyala normal namun kompresor tidak berputar dan LED modul berkedip kode error.',
    diagnosis:
      'Tegangan suplai 15V untuk driver IPM tidak stabil akibat kapasitor filter kering dan IC regulator switching melemah.',
    solution:
      'Penggantian IC regulator SMPS, pembaruan kapasitor elko low-ESR pada jalur 15V & 5V, serta pembersihan korosi pada pin sensor umpan balik.',
    componentsReplaced: ['IC Regulator TOP253', 'Elko Low-ESR 470uF/25V', 'Optocoupler PC817'],
    testResult: 'Kompresor Berjalan Normal & Arus Stabil 0.8A'
  },
  {
    id: 'case-03',
    title: 'Caldwell 130G MIG — Modifikasi Kontrol Wire Feeder PWM',
    category: 'SMPS & Modifikasi',
    brand: 'Caldwell 130G',
    imageUrl: '',
    symptom: 'Kecepatan dorong kawat las tidak stabil dan potensiometer bawaan sering rusak saat pemakaian durasi panjang.',
    diagnosis:
      'Sirkuit pengatur kecepatan motor feeder bawaan mengalami overheat ketika dipakai mengelas terus-menerus.',
    solution:
      'Integrasi modul kontroler PWM eksternal 20A berpendingin heatsink dengan suplai tegangan terisolasi sehingga putaran motor feeder presisi di setiap level ampere.',
    componentsReplaced: ['Modul PWM 20A Heavy Duty', 'Potensiometer Presisi', 'Konektor Panel'],
    testResult: 'Lulus Uji Pengelasan Kontinu & Wire Feed Halus'
  }
];