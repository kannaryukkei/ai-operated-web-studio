# Patokan Uji Desain v1.0 — Laundry Ceria

**Status:** Kandidat patokan tetap untuk percobaan desain Web Studio  
**Mode:** `studio_development`  
**Batas:** Internal, fiktif, PREVIEW ONLY · DEMO-ONLY · NOT_APPROVED

## 1. Tujuan

Dokumen ini menetapkan bahan uji yang sama untuk setiap percobaan kemampuan desain Web Studio.

Yang ingin kita tingkatkan:
1. Mencari contoh website yang benar-benar cocok dengan kebutuhan bisnis.
2. Memahami susunan, ukuran, jarak, tulisan, gambar, dan cara kerja desain pada contoh tersebut.
3. Mengubah hasil pengamatan menjadi rancangan website.
4. Membuat kode dan memperbaiki hasilnya berdasarkan tampilan website yang benar-benar dibuka di browser.

Kita ingin membandingkan kemampuan dan hasilnya, bukan mengganti brief setiap kali mencoba.

Dokumen ini hanya patokan uji. Bukan sistem pengelolaan proyek atau daftar tahapan wajib.

## 2. Bahan uji yang dikunci

Semua berkas di bawah ini berasal dari repository `kannaryukkei/laundry-ceria-website`, pada commit:

`68a95be5856c5d8cd25126a567e5fc7c4c66613b`

| Bahan | Lokasi tetap | SHA berkas |
|---|---|---|
| Catatan wawancara asli/fiktif (Stage 0) | [stage-0-source-fixture.md](https://github.com/kannaryukkei/laundry-ceria-website/blob/68a95be5856c5d8cd25126a567e5fc7c4c66613b/docs/stage-0-source-fixture.md) | `006916d4afe240d954a41d1b127948db9f8fe0be` |
| Hasil pemahaman bisnis (Stage 1) | [stage-1-discovery-strategy.md](https://github.com/kannaryukkei/laundry-ceria-website/blob/68a95be5856c5d8cd25126a567e5fc7c4c66613b/docs/stage-1-discovery-strategy.md) | `2070c2bc8dcc8ed700aa24bbb06a29f95cea9a01` |
| Rencana isi dan susunan website (Stage 2) | [stage-2-website-planning.md](https://github.com/kannaryukkei/laundry-ceria-website/blob/68a95be5856c5d8cd25126a567e5fc7c4c66613b/docs/stage-2-website-planning.md) | `09a8fc5221fb40025b34c60c72c730662a103de2` |

**Jangan gunakan Stage 3 Design Direction sebagai arahan desain untuk uji utama.** Dokumen tersebut sudah menentukan pilihan visual lama. Kita sengaja tidak memberikannya agar AI harus mencari contoh, menentukan arah desain, dan menjelaskan alasannya sendiri.

Kode website saat ini tetap menjadi titik awal yang sama untuk setiap percobaan:

- Repository: `kannaryukkei/laundry-ceria-website`
- Commit awal: `68a95be5856c5d8cd25126a567e5fc7c4c66613b`
- Stack tetap: React, TypeScript, dan Vite.
- Setiap percobaan harus dimulai dari commit tersebut, bukan dari hasil percobaan sebelumnya.

Titik awal Web Studio untuk uji pertama:

- Repository: `kannaryukkei/ai-operated-web-studio`
- Commit: `f6860e5e9c3d4ae8539f133dcadd4978f022116c`
- Master Skill: v1.13.
- Gunakan daftar skill yang aktif pada commit tersebut.

## 3. Fakta bisnis yang tidak boleh berubah

Laundry Ceria adalah usaha laundry kiloan fiktif. Pemiliknya Ratna (fiktif), dibantu satu karyawan, dan usaha digambarkan telah berjalan tiga tahun.

**Target pelanggan:** penghuni kos dan keluarga muda di sekitar toko.

**Layanan dan harga:**

| Layanan | Harga |
|---|---:|
| Cuci lipat | Rp8.000/kg |
| Cuci setrika | Rp12.000/kg |
| Setrika saja | Rp7.000/kg |
| Bed cover | Rp25.000/potong |
| Selimut | Rp20.000/potong |

**Waktu pengerjaan:**
- Layanan kiloan biasa: biasanya 2 hari.
- Ekspres: pakaian yang diterima sebelum pukul 10.00 selesai pada hari yang sama pukul 20.00.
- Biaya ekspres: tambahan 50% dari harga normal.

**Antar-jemput:**
- Radius 2 km dari toko.
- Pesanan di atas 5 kg: gratis.
- Pesanan 5 kg atau kurang: Rp5.000.

**Jam buka:**
- Senin–Sabtu: 08.00–20.00.
- Minggu: 09.00–15.00.

**Proses layanan:** pakaian diterima, ditimbang di depan pelanggan, dicatat per pelanggan, dicuci, dikeringkan, lalu dilipat atau disetrika sesuai layanan. Pelanggan diberi kabar saat selesai melalui WhatsApp menurut bahan sumber. Setiap pesanan dibungkus plastik gratis setelah selesai.

**Tujuan website:** membantu calon pelanggan memahami layanan dan cara memesan. Niat tindakannya adalah datang ke toko atau menghubungi WhatsApp.

Semua fakta tersebut adalah data latihan, bukan data usaha sungguhan.

## 4. Batasan yang wajib sama

- Alamat `Jl. Melati No. 12, Jakarta` adalah alamat fiktif. Harus diberi label yang jelas.
- WhatsApp belum dikonfigurasi. Jangan membuat nomor, tautan chat, kode QR, atau tombol WhatsApp yang benar-benar aktif.
- Tiga foto hanya berupa deskripsi. Berkas foto tidak tersedia dan izin tertulis belum ada. Jangan menggunakannya.
- Tidak ada logo resmi. Nama dalam bentuk tulisan biasa boleh digunakan sebagai pengganti sementara.
- Jangan membuat testimoni, rating, penghargaan, jumlah pelanggan, atau klaim keberhasilan.
- Jangan mengubah klaim pemilik tentang pakaian tidak tertukar menjadi jaminan.
- Jangan menambah harga, biaya, jam buka, layanan, syarat, atau cara pemesanan yang tidak ada di bahan.
- Tidak ada peta, petunjuk arah, pembayaran, pemesanan daring, atau pelacakan pesanan.
- Seluruh hasil tetap PREVIEW ONLY · DEMO-ONLY · NOT_APPROVED. Jangan menerbitkan atau memasang website ke produksi.

## 5. Hasil website yang diharapkan

Tetap satu halaman yang bisa digunakan pada ponsel, tablet, dan komputer.

Urutan isi yang dipatok:
1. Pemberitahuan bahwa website ini hanya contoh latihan.
2. Nama usaha dan navigasi.
3. Bagian pembuka yang menjelaskan usaha.
4. Daftar layanan dan harga.
5. Waktu pengerjaan biasa dan ekspres.
6. Urutan proses layanan.
7. Aturan antar-jemput.
8. Jam buka dan alamat fiktif.
9. Pilihan tindakan: datang langsung (dengan peringatan alamat fiktif) atau WhatsApp (jelas belum aktif).
10. Penutup dan pengingat bahwa website hanya contoh.

Susunan bagian dan informasi tidak boleh dikurangi atau diganti. Cara menampilkan, komposisi, warna, jenis huruf, gambar ilustrasi, jarak, dan gaya boleh dirancang ulang.

Website harus terasa dibuat khusus untuk usaha Laundry Ceria, bukan sekadar mengganti nama dan warna dari template umum.

## 6. Cara mencari dan membedah contoh desain

Pada setiap percobaan utama, mulai pencarian dengan tiga kalimat yang sama:

1. `small neighborhood laundry service website design prices services opening hours`
2. `modern wash and fold laundry landing page website`
3. `local laundromat website design pickup delivery pricing`

Boleh mencari lebih jauh bila hasil awal tidak cukup baik. Catat pencarian tambahan yang dipakai.

Pilih paling banyak tiga website yang benar-benar layak dipelajari. Utamakan website asli yang bisa dibuka, bukan hanya gambar contoh atau kumpulan template.

Untuk setiap contoh, catat:
- alamat website dan tanggal diperiksa;
- bagian desain yang layak dipelajari;
- alasan bagian itu cocok atau tidak cocok untuk Laundry Ceria;
- bagian yang sengaja tidak akan ditiru;
- gambar tangkapan layar sebagai bukti pengamatan.

Saat membedah desain, periksa:
- susunan halaman dan urutan bagian;
- letak teks, gambar, harga, dan tombol;
- lebar isi halaman dan pembagian kolom;
- ukuran, jenis, ketebalan, serta jarak tulisan;
- jarak antarbagian dan antarisi;
- bentuk kartu, garis, warna, dan ikon;
- ukuran dan potongan gambar;
- perubahan tampilan pada ponsel dan komputer;
- tindakan yang terjadi saat pengunjung menekan tombol atau tautan.

Pisahkan hal yang **terukur**, **perkiraan**, dan **belum diketahui**. Jangan mengaku tahu ukuran pasti jika hanya memperkirakan dari gambar.

Gabungkan pelajaran dari contoh menjadi desain baru yang cocok untuk Laundry Ceria. Jangan menyalin logo, teks, foto, kode, atau ciri khas milik pemilik website lain.

## 7. Cara membuat dan menguji website

Setiap percobaan:
1. Buat cabang baru dari commit awal website yang sudah dipatok di Bagian 2.
2. Jangan mengambil kode dari hasil percobaan lain.
3. Pertahankan React, TypeScript, dan Vite. Jangan mengganti teknologi tanpa alasan yang terbukti.
4. Laravel, database, dan sistem pengelolaan data bukan bagian dari uji desain ini.
5. Buat rancangan singkat dari contoh yang ditemukan sebelum menulis kode.
6. Implementasikan desain pada website.
7. Jalankan pemeriksaan kode dan build yang tersedia.
8. Buka hasil website di browser dan ambil tangkapan layar pada lebar 1440 px, 768 px, dan 390 px. Periksa juga lebar 320 px.
9. Bandingkan hasil dengan contoh dan rancangan. Catat bagian yang meleset.
10. Perbaiki tampilan dan ambil tangkapan layar ulang pada ukuran yang sama.

Gunakan lingkungan pemeriksaan yang sama untuk semua percobaan sebisa mungkin: Node.js 22, `npm ci`, Playwright 1.65.1, dan Chromium. Simpan tangkapan layar awal dan hasil akhir.

Build yang berhasil bukan bukti bahwa desain sudah bagus. Penilaian desain harus memakai hasil yang benar-benar tampil di browser.

## 8. Cara membandingkan hasil

Beri nilai 1–5 untuk setiap bagian. Sertakan bukti singkat; jangan memberi nilai hanya berdasarkan klaim AI sendiri.

| Bagian yang dinilai | Yang diperiksa |
|---|---|
| Kualitas contoh desain | Apakah website yang dipilih relevan dan memberi pelajaran yang jelas? |
| Ketepatan bedah desain | Apakah AI memahami susunan dan detail contoh dengan benar? |
| Kualitas tampilan | Apakah hasil terlihat menarik, rapi, khas, dan tidak terasa seperti template umum? |
| Kecocokan dengan bisnis | Apakah tampilan membantu calon pelanggan memahami layanan, harga, waktu, dan cara memesan? |
| Kerapian di berbagai ukuran | Apakah tampilan tetap baik di komputer, tablet, dan ponsel? |

Catat juga:
- waktu pengerjaan;
- jumlah website contoh yang diperiksa;
- jumlah putaran perbaikan;
- masalah desain yang ditemukan sendiri oleh AI;
- masalah yang masih tersisa;
- tautan cabang, commit, dan tangkapan layar.

Jangan membuat satu nilai gabungan berbobot pada v1.0. Kita kumpulkan nilai tiap bagian terlebih dahulu agar bobot tidak dibuat berdasarkan tebakan.

Gunakan `website-quality-review` pada mode AESTHETIC dan, saat ada contoh gambar yang benar-benar dibandingkan, VISUAL_FIDELITY. Nyatakan dengan jujur bila penilaian masih merupakan pemeriksaan mandiri.

## 9. Dua jenis uji

**Uji A — kemampuan penuh**

AI menerima bahan yang sama, mencari contoh sendiri, membedahnya, menentukan desain, membuat website, lalu memperbaiki hasil. Tautan dan contoh yang ditemukan adalah hasil pencarian AI; catat semuanya.

Uji ini mengukur kemampuan mencari contoh sampai menghasilkan website.

**Uji B — kemampuan mengikuti contoh**

Setelah Uji A pertama selesai, pilih contoh yang paling tepat dan simpan tangkapan layarnya. Kumpulan contoh itu kemudian dikunci dan diberikan sama persis pada setiap Uji B.

Uji ini mengukur kemampuan memahami contoh, membedahnya, dan menerapkannya ke kode tanpa dipengaruhi perbedaan hasil pencarian.

Jangan mencampur nilai Uji A dan Uji B. Uji B belum dimulai sampai kumpulan contoh pertama selesai dipilih dan disimpan.

## 10. Uji awal

Uji awal harus memakai:
- website awal `laundry-ceria-website@68a95be5856c5d8cd25126a567e5fc7c4c66613b`;
- Web Studio `ai-operated-web-studio@f6860e5e9c3d4ae8539f133dcadd4978f022116c`;
- Master Skill v1.13 dan skill aktif pada commit tersebut;
- model dan alat yang dipakai saat uji dicatat.

Jangan mengubah skill atau aturan Web Studio sebelum uji awal selesai. Hasil ini menjadi pembanding untuk percobaan sesudahnya.

Untuk membandingkan perubahan skill, usahakan model, alat, bahan, kode awal, dan ukuran tangkapan layar tetap sama. Bila yang diuji adalah alat baru, jangan sekaligus mengubah skill. Catat perubahan yang memang sengaja diuji.

## 11. Prompt tetap untuk setiap uji

Gunakan instruksi berikut bersama tiga bahan tetap pada Bagian 2 dan kode awal pada Bagian 2:

> Kerjakan uji desain Laundry Ceria berdasarkan Patokan Uji Desain v1.0. Gunakan mode `studio_development`. Jangan mengubah fakta, isi wajib, batasan, atau kode awal yang sudah dipatok.
>
> Cari contoh website yang relevan dengan pencarian awal yang sudah ditentukan. Periksa contoh aslinya, pilih yang paling berguna, dan jelaskan bagian yang akan dipelajari. Bedah susunan dan tampilannya sebelum mulai menulis kode.
>
> Buat desain yang cocok untuk usaha Laundry Ceria, bukan sekadar menyalin template. Terapkan pada website, periksa hasil sebenarnya di browser, lalu perbaiki berdasarkan tangkapan layar pada ukuran yang sama.
>
> Ambil keputusan desain dan teknis sendiri selama tidak mengubah fakta atau batasan. Jangan menambah Laravel, database, fitur pemesanan, kontak, atau layanan yang tidak diminta.
>
> Di akhir, laporkan contoh yang dipilih, keputusan desain, tautan kode, tangkapan layar awal dan akhir, hasil pemeriksaan, nilai tiap bagian, waktu pengerjaan, jumlah perbaikan, serta kekurangan yang tersisa. Jangan menyebut hal yang belum diuji sebagai berhasil.

## 12. Batas penggunaan

Patokan ini hanya untuk pengembangan internal. Data Laundry Ceria tetap fiktif. Hasil uji tidak boleh dianggap sebagai bukti penjualan atau hasil klien nyata.

Jangan membuat dokumen pelacakan tambahan untuk menjalankan patokan ini. Catatan hasil dapat disimpan dalam percakapan uji dan tautan cabang/commit website. Gunakan catatan kalibrasi yang sudah ada hanya bila ditemukan masalah yang perlu diperbaiki menjadi aturan Web Studio.
