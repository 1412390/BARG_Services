-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 17, 2017 at 04:15 PM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `barg`
--

-- --------------------------------------------------------

--
-- Table structure for table `point`
--

CREATE TABLE `point` (
  `id` int(11) NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT 'Địa chỉ đón khách',
  `type` int(1) NOT NULL COMMENT 'Loại xe (0: thường hoặc 1:PREMIUM) ',
  `note` text CHARACTER SET utf8mb4 NOT NULL COMMENT 'ghi chú',
  `status` int(1) NOT NULL COMMENT '-1: chưa định vị, 0: đang định vị, 1: đã định vi',
  `user_id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `lat` double NOT NULL COMMENT 'kinh do',
  `lng` double NOT NULL COMMENT 'vi do'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `point`
--

INSERT INTO `point` (`id`, `address`, `type`, `note`, `status`, `user_id`, `driver_id`, `lat`, `lng`) VALUES
(11, '172 bàu cát', 0, '', 1, 1, 23, 10.7918212, 106.64357840000002),
(12, '172 bàu cát', 0, '', 1, 1, 17, 10.7918212, 106.64357840000002);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `point`
--
ALTER TABLE `point`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `point`
--
ALTER TABLE `point`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
