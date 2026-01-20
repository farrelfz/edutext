# edutext-UNJ

Halaman web statis sederhana untuk menampilkan konten `README.md` dan berkas JSON yang tersedia di repositori.

## Menjalankan

Gunakan server statis lokal agar permintaan `fetch` ke berkas bekerja mulus.

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000` di peramban. Halaman akan:

- Menampilkan isi `README.md`.
- Menyediakan daftar berkas JSON (contoh: `data/example.json`) dan penampil JSON.
- Mengizinkan unggah berkas JSON dari perangkat untuk dilihat langsung.
