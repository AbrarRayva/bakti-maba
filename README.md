# Bakti Maba - Sequelize Tutorial

Dokumen ini menjelaskan cara mengelola skema database dan data awal menggunakan Sequelize dalam proyek Bakti Maba.

## 1. Prasyarat

- [Node.js](https://nodejs.org/) (versi LTS direkomendasikan)
- Server database [PostgreSQL](https://www.postgresql.org/download/) yang sedang berjalan.

## 2. Struktur Direktori

Semua file yang berhubungan dengan Sequelize disimpan di dalam direktori `src/` untuk menjaga kerapian proyek:

- `src/config/config.json`: Konfigurasi koneksi database untuk lingkungan development, test, dan production.
- `src/models/`: Definisi model Sequelize yang merepresentasikan tabel di database.
- `src/migrations/`: File-file migrasi untuk mengubah skema database secara bertahap.
- `src/seeders/`: File-file seeder untuk mengisi data awal ke dalam database.
- `.sequelizerc`: File konfigurasi yang memberitahu `sequelize-cli` untuk menggunakan path di atas.

## 3. Instalasi & Konfigurasi Awal

1.  **Clone Repositori**
    ```bash
    git clone <url-repositori-anda>
    cd bakti-maba
    ```

2.  **Install Dependensi**
    Jalankan perintah berikut untuk menginstal semua package yang dibutuhkan, termasuk Express, Sequelize, dan lainnya.
    ```bash
    npm install
    ```

3.  **Buat Database**
    Pastikan Anda memiliki database PostgreSQL dengan nama `bakti-maba`. Anda bisa membuatnya menggunakan `psql` atau pgAdmin.

4.  **Konfigurasi Koneksi**
    Buka file `src/config/config.json`. Sesuaikan `username` dan `password` agar sesuai dengan konfigurasi PostgreSQL Anda.
    ```json
    {
      "development": {
        "username": "postgres",
        "password": "password", // Ganti dengan password Anda jika berbeda
        "database": "bakti-maba",
        "host": "127.0.0.1",
        "dialect": "postgres"
      }
      // ... konfigurasi test dan production
    }
    ```

## 4. Perintah Database (npm scripts)

Beberapa skrip telah disiapkan di `package.json` untuk memudahkan pengelolaan database.

### `npm run db:sync`

Menjalankan semua migrasi yang belum pernah dijalankan. Perintah ini akan membuat semua tabel di database Anda sesuai dengan file-file migrasi yang ada.

**Kapan digunakan?**
- Saat pertama kali menyiapkan proyek.
- Saat ada migrasi baru yang ditambahkan oleh anggota tim lain.

### `npm run db:seed`

Menjalankan semua file *seeder* untuk mengisi database dengan data awal. Contohnya, perintah ini akan membuat user admin yang telah kita siapkan.

**Kapan digunakan?**
- Setelah database berhasil dibuat/disinkronkan untuk pertama kali.
- Saat Anda ingin mengembalikan data awal ke database. 