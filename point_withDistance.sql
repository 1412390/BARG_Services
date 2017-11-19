-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th10 19, 2017 lúc 02:23 PM
-- Phiên bản máy phục vụ: 10.1.28-MariaDB
-- Phiên bản PHP: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `barg`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `point`
--

CREATE TABLE `point` (
  `id` int(11) NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT 'Địa chỉ đón khách',
  `type` int(1) NOT NULL COMMENT 'Loại xe (0: thường hoặc 1:PREMIUM) ',
  `note` text CHARACTER SET utf8mb4 NOT NULL COMMENT 'ghi chú',
  `status` int(1) NOT NULL COMMENT '-1: chưa định vị, 0: đang định vị, 1: đã định vi 2: đã có xe nhận',
  `user_id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `distance` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `point`
--

INSERT INTO `point` (`id`, `address`, `type`, `note`, `status`, `user_id`, `driver_id`, `lat`, `lng`, `distance`) VALUES
(24, '172 bau cat', 0, '<p>asdfasdf</p>\r\n', 1, 1, 23, 10.7918212, 106.64357849999999, 1160),
(25, '03 hoa binh dam sen', 0, '<p>asdf&nbsp;</p>\r\n', 1, 1, 3, 10.7661264, 106.63946780000003, 160);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `point`
--
ALTER TABLE `point`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `point`
--
ALTER TABLE `point`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
