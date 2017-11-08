-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 08, 2017 at 09:54 AM
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
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `locate`
--

CREATE TABLE `locate` (
  `id` int(11) NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT 'Địa chỉ đón khách',
  `type` int(1) NOT NULL COMMENT 'Loại xe (0: thường hoặc 1:PREMIUM) ',
  `note` text CHARACTER SET utf8mb4 NOT NULL COMMENT 'ghi chú'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `locate`
--

INSERT INTO `locate` (`id`, `address`, `type`, `note`) VALUES
(1, '384 su van hanh', 0, '<p>xe 4 cho</p>\r\n'),
(2, '492 ly thuong kiet', 1, '<p>xe 7 cho</p>\r\n'),
(3, '492 ly thuong kiet', 1, '<p>xe 7 cho</p>\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `dob` int(11) NOT NULL,
  `role` int(1) NOT NULL COMMENT '-1: chưa duyệt, 0: điện thoại viên, 1: nhân viên, 2: quản lý, 3: admin'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `name`, `email`, `dob`, `role`) VALUES
(1, 'anhbap123', '$2a$10$10I8pXvL.LD7eF/XeWfkJOPI9D5p/WB7zzP6zPhjlQ5Hw3fleYqk6', 'hoang phat', 'thainguyenhoangphatit@gmail.com', 1509555600, 0),
(2, 'htahg1998', '$2a$10$94mpzXZkaQe3xjoKGy.vI..1r5JsBENGZwZWN.GT71CT26SgtQQ5m', 'Kira Kun', 'htahg1998@gmail.com', 1507654800, -1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locate`
--
ALTER TABLE `locate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `locate`
--
ALTER TABLE `locate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
