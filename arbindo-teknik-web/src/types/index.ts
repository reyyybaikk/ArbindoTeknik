export type PortfolioCategory =
  | 'Semua Kasus'
  | 'Mesin Las Inverter'
  | 'Modul Inverter'
  | 'SMPS & Modifikasi';

export interface CaseStudy {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'Semua Kasus'>;
  brand: string;
  imageUrl: string;
  symptom: string;
  diagnosis: string;
  solution: string;
  componentsReplaced: string[];
  testResult: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  brands: string[];
  tags: string[];
  iconName: 'zap' | 'cpu' | 'battery-charging' | 'volume-2';
}

export interface TicketInfo {
  id: string;
  device_model: string;
  status: string;
  step: number;
  note: string;
  created_at: string;
}

export interface TicketTrackResponse {
  success: boolean;
  message?: string;
  ticket?: TicketInfo;
}