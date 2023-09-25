-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 25 Sep 2023 pada 13.43
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user` varchar(65) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(65) NOT NULL,
  `status` varchar(64) NOT NULL,
  `url` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `cart`
--

INSERT INTO `cart` (`id`, `user`, `product_id`, `product_name`, `status`, `url`) VALUES
(1, 'TsumuX', 1, 'Jasa website', 'selesai', 'https://ruko.s3.ap-southeast-1.amazonaws.com/rumahkomunitas.com/tulisan/180319043514_your-website.jpg'),
(2, 'TsumuX', 2, 'developer SA-MP', 'sedang dikerjakan (progres 80%)', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIxV58LKVHopPxGPdYKJwXuwqgZGaG-eSaKg&usqp=CAU');

-- --------------------------------------------------------

--
-- Struktur dari tabel `list_order`
--

CREATE TABLE `list_order` (
  `id` int(11) NOT NULL,
  `from_user` varchar(65) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(65) NOT NULL,
  `price` int(11) NOT NULL,
  `detail` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `list_order`
--

INSERT INTO `list_order` (`id`, `from_user`, `product_id`, `product_name`, `price`, `detail`) VALUES
(1, 'TsumuX', 1, 'Jasa website', 200, 'Buat website seperti c.ai'),
(2, 'TsumuX', 2, 'developer SA-MP', 50, 'server seperti lunar pride');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_picture` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`id`, `product_name`, `product_picture`, `price`, `description`) VALUES
(1, 'Jasa website', 'https://ruko.s3.ap-southeast-1.amazonaws.com/rumahkomunitas.com/tulisan/180319043514_your-website.jpg', 200, 'jasa pembuatan website buat contoh by RyuX\r\nharga bisa berubah tergantung web yang ingin dibuat'),
(2, 'developer SA-MP', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIxV58LKVHopPxGPdYKJwXuwqgZGaG-eSaKg&usqp=CAU', 50, 'Sudah termaksud jasa fix bug dan buat fitur, harga bisa berubah tergantung durasi');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(64) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(64) NOT NULL,
  `salt` varchar(64) NOT NULL,
  `saldo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `salt`, `saldo`) VALUES
(1, 'TsumuX', 'ts-ex@gmail.com', '$2b$10$BaiFSVut/d/eTD4HI3UwjedFzdsQCSTKYNw8ZXqSaGq6N56lO7GQC', '$2b$10$BaiFSVut/d/eTD4HI3Uwje', 250);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `list_order`
--
ALTER TABLE `list_order`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `list_order`
--
ALTER TABLE `list_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
