# FrontEnd
# HTML
## Doctype dan Head
- `<!DOCTYPE html>`: Deklarasi tipe dokumen HTML yang digunakan.
- `<meta charset="UTF-8">`: Mengatur encoding karakter menjadi UTF-8.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Mengatur tampilan yang responsif sesuai dengan lebar perangkat.
- `<link rel="stylesheet" href="styles.css">`: Menghubungkan file CSS eksternal ke halaman HTML.
- `<title>RyuX & Agus Samp shop</title>`: Menetapkan judul halaman.

## Isi Halaman
- Dua bentuk formulir untuk registrasi dan login.
- Tombol "Cart" untuk mengakses keranjang belanja.
- Bagian "Tentang Store," "Promo," dan "Scam" untuk informasi mengenai toko.
- Bagian "Saldo Di Akun Anda" untuk menampilkan saldo pengguna.
- Bagian "List Pesanan Anda dan Statusnya" untuk menampilkan status pesanan.
- Bagian "List Product yang Tersedia di Store Kami" untuk menampilkan produk yang tersedia di toko.

## JavaScript
- Terdapat banyak variabel yang digunakan untuk menyimpan elemen-elemen HTML dan data.
- Fungsi `changeFormPage(page)` digunakan untuk mengganti tampilan formulir antara login dan registrasi.
- Fungsi `loginUser(email, password)` digunakan untuk melakukan login dengan mengirimkan permintaan POST ke `/login`.
- Fungsi `displaySaldo(saldoUser)` digunakan untuk menampilkan saldo pengguna.
- Fungsi `showCart(user)` digunakan untuk menampilkan daftar pesanan pengguna dengan mengirimkan permintaan POST ke `/cart`.
- Fungsi `showProduct()` digunakan untuk menampilkan daftar produk yang tersedia dengan mengirimkan permintaan GET ke `/product`.
- Event listener untuk formulir registrasi dan login.
- Event listener untuk tombol "Login" dan "Register" di halaman awal.
- Event listener untuk tombol "Cart" yang memungkinkan pengguna mengakses keranjang belanja.
- Penggunaan cookie untuk menyimpan email dan password pengguna.

# CSS
- CSS digunakan untuk mengatur tampilan halaman web dengan berbagai properti seperti warna latar belakang, ukuran font, margin, padding, dan lain-lain.
- Berbagai kelas CSS seperti `.register-form`, `.login-form`, `.product`, `.saldo-user`, `.order-list`, `.product-item`, dan lainnya digunakan untuk mengatur tampilan elemen-elemen HTML.

Demikian adalah dokumentasi singkat dari kode HTML, CSS, dan JavaScript yang Anda berikan. Dokumentasi ini mencakup struktur dan fungsionalitas utama dari halaman web tersebut.


# BackEnd

# app.js
- Import modul-modul yang diperlukan seperti `express`, `body-parser`, dan beberapa fungsi dari file lain.
- Membuat instance Express dengan `const app = express();`.
- Menggunakan middleware `express.static` untuk menyajikan file statis dari direktori 'public'.
- Menggunakan middleware `body-parser.json()` untuk mengurai data JSON yang dikirim oleh klien.
- Mendefinisikan beberapa endpoint HTTP untuk melayani permintaan dari klien, seperti endpoint untuk registrasi, login, tampilkan produk, cari produk, upload produk, beli produk, dan tampilkan keranjang belanja.
- Menghubungkan ke database MySQL menggunakan `require('./function/database')`.
- Memulai server dengan `app.listen()` di port 80.

# products.js
- Import modul `database` untuk menghubungkan ke database MySQL.
- Membuat beberapa fungsi yang berhubungan dengan produk seperti `showProduct`, `insertProducts`, dan `findProduct`.
- Fungsi `showProduct` mengambil data produk dari tabel database.
- Fungsi `insertProducts` digunakan untuk menambahkan produk ke database.
- Fungsi `findProduct` digunakan untuk mencari produk berdasarkan nama produk.

# order.js
- Import modul `database` untuk menghubungkan ke database MySQL.
- Membuat fungsi `buyProduct` yang digunakan untuk melakukan pembelian produk. Fungsi ini melakukan beberapa tindakan seperti mengambil data produk yang akan dibeli, memeriksa saldo pengguna, mengurangi saldo, dan menambahkan pesanan ke database.

# user/register.js
- Import modul `database` untuk menghubungkan ke database MySQL.
- Menggunakan modul `bcrypt` untuk mengenkripsi password pengguna.
- Membuat fungsi `isUsernameAndEMailExist` untuk memeriksa apakah username atau email sudah ada dalam database.
- Membuat fungsi `createAccount` untuk membuat akun pengguna baru. Fungsi ini melakukan beberapa tindakan seperti memeriksa apakah username atau email sudah ada, mengenkripsi password, dan menambahkan akun pengguna ke database.

# user/login.js
- Import modul `database` untuk menghubungkan ke database MySQL.
- Menggunakan modul `bcrypt` untuk membandingkan password yang diinputkan dengan yang tersimpan di database.
- Membuat fungsi `login` untuk melakukan proses login. Fungsi ini mengambil data pengguna berdasarkan email, membandingkan password, dan mengembalikan hasil login.

# user/cart.js
- Import modul `database` untuk menghubungkan ke database MySQL.
- Membuat fungsi `showCart` untuk menampilkan keranjang belanja pengguna berdasarkan username.

# database.js
- Menggunakan modul `mysql` untuk membuat koneksi ke database MySQL.
- Mengambil konfigurasi koneksi dari file 'config.json'.
- Membuat objek koneksi dengan `mysql.createConnection()` dan melakukan koneksi ke database.
- Objek koneksi diekspor untuk digunakan di seluruh aplikasi.

# Konfigurasi database
- Konfigurasi database seperti host, user, password, dan nama database diambil dari file 'config.json'.

Dengan demikian, kode server-side Anda memiliki fungsi-fungsi untuk mengelola akun pengguna, produk, dan pesanan dengan koneksi ke database MySQL. Ini adalah dokumentasi singkat dari kode server-side Anda.
