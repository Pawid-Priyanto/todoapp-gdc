# ==============================================
# STAGE 1: Build Aplikasi React
# ==============================================
# Menggunakan Node.js versi 20 berbasis Alpine Linux agar ringan
FROM node:20-alpine AS builder

# Menentukan folder kerja di dalam container
WORKDIR /app

# Menyalin file package.json dan package-lock.json (atau pnpm-lock.yaml jika pakai pnpm)
COPY package*.json ./

# Menginstal semua dependencies
RUN npm install

# Menyalin seluruh kode sisa dari project kamu ke dalam container
COPY . .

# Melakukan build aplikasi React (menghasilkan folder dist/ atau build/)
RUN npm run build

# ==============================================
# STAGE 2: Jalankan dengan Server Nginx
# ==============================================
# Menggunakan web server Nginx versi Alpine yang super kecil
FROM nginx:alpine

# Menyalin hasil build React dari Stage 1 (folder dist) ke folder static Nginx
# Catatan: Jika project kamu menggunakan Create React App lama, ganti "dist" menjadi "build"
COPY --from=builder /app/dist /usr/share/nginx/html

# Menyalin konfigurasi custom Nginx kita ke dalam container (akan kita buat setelah ini)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Membuka port 80 di dalam container agar bisa diakses
EXPOSE 80

# Menjalankan Nginx di foreground agar container tetap hidup
CMD ["nginx", "-g", "daemon off;"]