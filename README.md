# Tugas Praktikum 3 - Expense Tracker

Nama: Davvin Denielsen Fusta
NIM: 535250143

Website pencatat pengeluaran sederhana berbasis HTML, CSS, dan JavaScript. Seluruh data tersimpan otomatis di browser menggunakan LocalStorage karena tidak memakai Backend

Fitur Utama:
1. Input keterangan dan nominal pengeluaran melalui form.
2. Menampilkan seluruh riwayat pengeluaran yang telah ditambahkan.
3. Menampilkan total banyaknya transaksi pengeluaran.
4. Menghapus data pengeluaran tertentu.
5. Menampilkan akumulasi total nominal pengeluaran dalam format Rupiah.

Cara Kerja:
- HTML digunakan untuk menyusun kerangka halaman, mulai dari form input, kartu status saldo, hingga daftar transaksi.
- CSS menggunakan kombinasi Flexbox dan Grid agar tata letak tetap rapi dan responsif di layar ponsel maupun laptop.
- JavaScript menyimpan data pengeluaran dalam variabel array objek.
- Ketika form dikirim, data divalidasi agar tidak kosong, lalu dimasukkan ke dalam array dan disimpan ke LocalStorage.
- Total nominal dihitung dengan menjumlahkan nominal seluruh item di array, sedangkan jumlah transaksi diambil dari panjang array.
- Fungsi hapus memanfaatkan event delegation untuk menyaring dan membuang data yang dipilih berdasarkan id, kemudian tampilan diperbarui secara otomatis.

Cara Menjalankan:
Cukup buka file index.html langsung menggunakan browser seperti Google Chrome atau Microsoft Edge.
