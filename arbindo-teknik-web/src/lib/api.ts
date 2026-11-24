import { CaseStudy, TicketTrackResponse } from '@/types';
import { CASE_STUDIES_DATA } from '@/data/portfolios';

const GAS_WEBAPP_URL = process.env.NEXT_PUBLIC_GAS_WEBAPP_URL || '';
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

export async function trackServiceTicket(ticketId: string): Promise<TicketTrackResponse> {
  const cleanId = ticketId.trim().toUpperCase();
  if (!cleanId) {
    return { success: false, message: 'Masukkan nomor tiket terlebih dahulu.' };
  }

  if (!GAS_WEBAPP_URL || GAS_WEBAPP_URL.includes('ID_DEPLOYMENT_ANDA')) {
    return {
      success: false,
      message: 'URL Web App Google Apps Script belum diatur di file .env.local.'
    };
  }

  try {
    const url = `${GAS_WEBAPP_URL}?action=track&ticket=${encodeURIComponent(cleanId)}`;
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store'
    });

    if (!response.ok) {
      return { success: false, message: `Gagal terhubung ke server (${response.status}).` };
    }

    const data: unknown = await response.json();
    if (typeof data !== 'object' || data === null) {
      return { success: false, message: 'Format data pelacakan dari server tidak valid.' };
    }
    const ticketResponse = data as Partial<TicketTrackResponse>;
    if (
      typeof ticketResponse.success !== 'boolean' ||
      (ticketResponse.ticket &&
        (typeof ticketResponse.ticket.id !== 'string' ||
          typeof ticketResponse.ticket.device_model !== 'string' ||
          typeof ticketResponse.ticket.status !== 'string' ||
          typeof ticketResponse.ticket.step !== 'number' ||
          typeof ticketResponse.ticket.note !== 'string' ||
          typeof ticketResponse.ticket.created_at !== 'string'))
    ) {
      return { success: false, message: 'Format data pelacakan dari server tidak valid.' };
    }
    if (ticketResponse.ticket) {
      return {
        success: ticketResponse.success,
        message: ticketResponse.message,
        ticket: {
          ...ticketResponse.ticket,
          step: Math.min(4, Math.max(1, Math.round(ticketResponse.ticket.step)))
        }
      };
    }
    return {
      success: ticketResponse.success,
      message: ticketResponse.message
    };
  } catch {
    return {
      success: false,
      message: 'Tidak dapat terhubung ke sistem pelacakan. Periksa koneksi internet Anda.'
    };
  }
}

/**
 * Mengambil data portofolio langsung dari Google Sheets (?action=portfolios),
 * otomatis fallback ke data statis jika sheet masih kosong atau offline.
 */
export async function fetchPublicPortfolios(): Promise<CaseStudy[]> {
  if (!GAS_WEBAPP_URL || GAS_WEBAPP_URL.includes('ID_DEPLOYMENT_ANDA')) {
    return CASE_STUDIES_DATA;
  }

  try {
    const response = await fetch(`${GAS_WEBAPP_URL}?action=portfolios`, {
      method: 'GET',
      cache: 'no-store'
    });
    if (!response.ok) return CASE_STUDIES_DATA;

    const data: unknown = await response.json();
    if (
      typeof data === 'object' &&
      data !== null &&
      'success' in data &&
      data.success === true &&
      'portfolios' in data &&
      Array.isArray(data.portfolios)
    ) {
      const portfolios = data.portfolios.filter(isCaseStudy);
      if (portfolios.length > 0) return portfolios;
    }
    return CASE_STUDIES_DATA;
  } catch {
    return CASE_STUDIES_DATA;
  }
}

export function buildWhatsAppLink(customMessage?: string): string {
  const phoneNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  if (!phoneNumber) return '';

  const defaultMsg =
    'Halo Arbindo Teknik, saya ingin berkonsultasi mengenai perbaikan perangkat elektronik / inverter.';
  const text = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${phoneNumber}?text=${text}`;
}

function isCaseStudy(value: unknown): value is CaseStudy {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  const validCategories = ['Mesin Las Inverter', 'Modul Inverter', 'SMPS & Modifikasi'];
  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.category === 'string' &&
    validCategories.includes(item.category) &&
    typeof item.brand === 'string' &&
    typeof item.imageUrl === 'string' &&
    typeof item.symptom === 'string' &&
    typeof item.diagnosis === 'string' &&
    typeof item.solution === 'string' &&
    Array.isArray(item.componentsReplaced) &&
    item.componentsReplaced.every((component) => typeof component === 'string') &&
    typeof item.testResult === 'string'
  );
}