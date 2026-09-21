# SmartAI Refrigerator — Frontend

Antarmuka web **SmartAI Refrigerator**: dashboard kulkas pintar untuk mengelola bahan makanan, memantau kedaluwarsa, membuat resep dengan AI, dan mengobrol dengan asisten dapur.

> Repo pasangan: [backend](../backend) (Express + Prisma + MySQL). Backend harus berjalan agar aplikasi berfungsi penuh.

## Fitur

- **Login & registrasi** dengan halaman auth khusus (latar animasi Aurora) dan proteksi rute untuk halaman lain.
- **Dashboard** – statistik bahan, bahan yang hampir kedaluwarsa, ringkasan kategori, aktivitas terbaru, resep rekomendasi, dan panel asisten AI.
- **Kulkas** – daftar bahan dengan kartu, badge kedaluwarsa, tambah/ubah/hapus lewat modal, serta halaman detail bahan.
- **Generator resep** – atur preferensi (waktu masak, tingkat kesulitan), lihat daftar bahan dengan checklist, langkah memasak, sumber referensi, dan riwayat resep yang pernah dilihat.
- **Chat AI** – respons streaming (SSE) dengan tombol stop dan regenerate, render Markdown, kartu resep di dalam chat, serta input suara memakai Web Speech API browser.
- **Tema terang/gelap** dan animasi halaman (GSAP, progress bar rute, scroll reveal).
- **Pengaturan** – halaman settings.

## Teknologi

- [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- [React Router 6](https://reactrouter.com/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Axios](https://axios-http.com/) untuk pemanggilan API
- [GSAP](https://gsap.com/) dan [OGL](https://github.com/oframe/ogl) untuk animasi
- [react-markdown](https://github.com/remarkjs/react-markdown) + remark-gfm
- [lucide-react](https://lucide.dev/) untuk ikon

## Struktur Proyek

```
src/
  App.jsx              # definisi rute
  main.jsx
  pages/               # Login, Register, Dashboard, Refrigerator,
                       # IngredientDetail, RecipeGenerator, RecipeDetail,
                       # Chat, Settings
  components/
    auth/              # form & layout login/register
    chat/              # ChatWindow, MessageBubble, ChatInput, VoiceButton, dll.
    dashboard/         # kartu-kartu dashboard
    ingredient/        # kartu, form, modal, badge kedaluwarsa
    recipe/            # kartu resep, checklist, preferensi, riwayat
    layout/            # Layout, Sidebar, Topbar, ProtectedRoute
    common/            # Aurora, Avatar, LazyImage, ThemeToggle, dll.
  context/             # AuthContext, ChatContext, ThemeContext
  hooks/               # useAuth, useChatStream, useIngredients, useRecipes, ...
  services/            # klien API (axios): auth, ingredient, recipe, chat, dashboard
  utils/
  assets/
```

## Prasyarat

- Node.js 18 atau lebih baru
- Backend SmartAI Refrigerator yang berjalan di `http://localhost:5000`

## Instalasi

```bash
# 1. Install dependensi
npm install

# 2. Salin file environment
cp .env.example .env

# 3. Jalankan development server
npm run dev
```

Aplikasi terbuka di `http://localhost:5173`.

## Konfigurasi Environment

```env
VITE_API_URL=http://localhost:5000/api
```

Selain itu, `vite.config.js` sudah memakai proxy `/api` → `http://localhost:5000` saat development. Jika `VITE_API_URL` kosong, klien Axios memakai path relatif `/api`.

## Skrip

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Development server (port 5173) |
| `npm run build` | Build production ke folder `dist/` |
| `npm run preview` | Pratinjau hasil build |

## Alur Autentikasi

1. Login/registrasi memanggil `/api/auth/login` atau `/api/auth/register`.
2. Token JWT disimpan di `localStorage` (`smartai-auth-token`) dan dikirim otomatis lewat interceptor Axios sebagai header `Authorization: Bearer <token>`.
3. Saat aplikasi dibuka, sesi dipulihkan dengan memanggil `/api/auth/me`.
4. Semua halaman selain `/login` dan `/register` dibungkus `ProtectedRoute`.

## Deployment

Jalankan `npm run build`, lalu sajikan folder `dist/` dengan web server statis. Pastikan permintaan ke `/api/*` di-*reverse proxy* ke backend, karena fitur chat streaming memanggil path relatif `/api/chat/stream`.

Contoh Nginx:

```nginx
location /api/ {
  proxy_pass http://localhost:5000;
  proxy_buffering off;   # penting agar streaming SSE berjalan lancar
}
location / {
  try_files $uri /index.html;
}
```

## Catatan

- Kartu **Temperature Trend** di dashboard saat ini memakai data contoh statis; belum terhubung ke sensor/backend.
- Input suara memakai Web Speech API bawaan browser, sehingga dukungannya bergantung pada browser (paling baik di Chrome/Edge).
