# Arbindo Teknik Website

Website company profile dan workshop tracker untuk Arbindo Teknik.

## Pengembangan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Variabel Environment

Buat atau perbarui `.env.local`:

```env
NEXT_PUBLIC_GAS_WEBAPP_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
NEXT_PUBLIC_WHATSAPP_NUMBER=628xxxxxxxxxx
NEXT_PUBLIC_WORKSHOP_ADDRESS=Alamat lengkap workshop
```

Tanpa `NEXT_PUBLIC_GAS_WEBAPP_URL`, portofolio menggunakan data statis dan pelacakan tiket menampilkan pesan konfigurasi.
Tanpa `NEXT_PUBLIC_WHATSAPP_NUMBER`, tautan WhatsApp tidak akan dibuat.

## Pemeriksaan

```bash
npm run lint
npm run build
```
