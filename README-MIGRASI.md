# SIREKAP v2 - Panduan Migrasi ke Vercel Cloud & Google Sheets

Workspace ini adalah versi eksperimental dari SIREKAP yang akan di-deploy ke Vercel menggunakan arsitektur **Serverless** (Vanilla JS + Node.js) dan **Google Sheets** sebagai database.

## Struktur Baru Aplikasi:
- Semua file UI (`.php`) akan diubah menjadi `.html`. Sistem otentikasi tidak lagi menggunakan PHP Sessions, melainkan menggunakan `localStorage` (JWT/Token based).
- Folder `/api` (segera dibuat) akan berisi file `.js` yang bertindak sebagai *backend serverless* Vercel.

## Persiapan Pra-Migrasi (Wajib Anda Lakukan)
Untuk menghubungkan aplikasi ke Google Sheets, Anda memerlukan Kredensial API dari Google. Ikuti langkah berikut:

### 1. Buat Google Cloud Service Account
1. Buka [Google Cloud Console](https://console.cloud.google.com/).
2. Buat proyek baru bernama "Sirekap Cloud".
3. Pergi ke menu **APIs & Services > Library**, cari dan aktifkan **Google Sheets API**.
4. Pergi ke menu **Credentials**, klik **Create Credentials > Service account**.
5. Beri nama service account (misal: `sirekap-bot`).
6. Setelah terbuat, masuk ke detail Service Account tersebut, masuk ke tab **Keys**, klik **Add Key > Create new key**, pilih **JSON**.
7. File `.json` akan terdownload. Di dalamnya terdapat `client_email` dan `private_key`. Simpan file ini baik-baik.

### 2. Siapkan Google Spreadsheet
1. Buka [Google Sheets](https://docs.google.com/spreadsheets).
2. Buat Spreadsheet baru bernama "Database Sirekap".
3. Buat 3 tab/sheet di bawah: `permohonan`, `dicetak`, `users`.
4. Klik tombol **Bagikan (Share)** di pojok kanan atas.
5. Masukkan alamat email dari `client_email` yang ada di file JSON tadi (biasanya berakhiran `@sirekap-cloud.iam.gserviceaccount.com`).
6. Berikan akses sebagai **Editor**.
7. Salin **ID Spreadsheet** dari URL (teks panjang acak setelah `/d/` dan sebelum `/edit`).

### 3. Setup Lingkungan Node.js (Opsional untuk testing lokal)
Jika Anda ingin menjalankan API ini secara lokal sebelum diunggah ke Vercel, pastikan Anda telah menginstal Node.js di komputer Anda (unduh dari nodejs.org).

## Langkah Selanjutnya
Jika Anda sudah mendapatkan **ID Spreadsheet**, **client_email**, dan **private_key**, sampaikan kepada asisten AI Anda untuk mulai merancang kode `api/login.js`, `api/action.js`, dll!