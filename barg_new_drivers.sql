-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th10 12, 2017 lúc 11:28 AM
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
-- Cấu trúc bảng cho bảng `drivers`
--

CREATE TABLE `drivers` (
  `name` varchar(50) NOT NULL,
  `plate_id` varchar(50) NOT NULL,
  `status` text NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `id` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `drivers`
--

INSERT INTO `drivers` (`name`, `plate_id`, `status`, `lat`, `lng`, `id`) VALUES
('Verner Moore', '406', 'free', 10.7667, 106.642, '0'),
('Rylan Rutherford', '331', 'free', 10.7669, 106.641, '1'),
('Claudia Conroy', '299', 'free', 10.7493, 106.642, '10'),
('Damon Bradtke III', '137', 'free', 10.7777, 106.625, '11'),
('Ms. Darrick Wehner', '150', 'free', 10.7617, 106.651, '12'),
('Pattie Ondricka', '362', 'busy', 10.7708, 106.632, '13'),
('Manuela Casper', '917', 'busy', 10.739, 106.648, '14'),
('Ms. Chester Will', '241', 'busy', 10.7698, 106.628, '15'),
('Giuseppe Nader', '376', 'busy', 10.7564, 106.67, '16'),
('Pascale Bins Sr.', '713', 'free', 10.7903, 106.638, '17'),
('Jordy Lemke', '486', 'busy', 10.7578, 106.669, '18'),
('Keshawn Stark', '102', 'busy', 10.7722, 106.621, '19'),
('Zelma Wyman', '931', 'busy', 10.7652, 106.644, '2'),
('Madelyn Emmerich', '143', 'busy', 10.7501, 106.646, '20'),
('Ryder Kuphal', '559', 'free', 10.8002, 106.638, '21'),
('Janiya Crooks', '609', 'free', 10.7462, 106.677, '22'),
('Paul Schuppe', '74', 'free', 10.7872, 106.638, '23'),
('Adam Hodkiewicz', '175', 'busy', 10.72, 106.673, '24'),
('Lyda Schuster', '879', 'busy', 10.8119, 106.632, '25'),
('Simone Ullrich', '451', 'free', 10.7341, 106.68, '26'),
('Delaney Lubowitz', '86', 'free', 10.7863, 106.607, '27'),
('Destany Dickens', '918', 'busy', 10.7229, 106.692, '28'),
('Cruz Smitham', '496', 'free', 10.7673, 106.633, '29'),
('Celestine Block I', '884', 'free', 10.7667, 106.639, '3'),
('Emory Kulas', '351', 'free', 10.722, 106.682, '30'),
('Lisa Corkery', '711', 'busy', 10.8047, 106.586, '31'),
('Quentin Ernser', '121', 'free', 10.7053, 106.686, '32'),
('Tristin Bechtelar', '525', 'free', 10.7775, 106.603, '33'),
('Mrs. Julio Lubowitz', '977', 'busy', 10.7034, 106.691, '34'),
('Quincy Reichel', '599', 'free', 10.8041, 106.624, '35'),
('Bethany Pacocha', '541', 'free', 10.7139, 106.659, '36'),
('Leonora Swaniawski', '791', 'free', 10.7841, 106.612, '37'),
('Ms. Renee Hagenes', '525', 'busy', 10.7647, 106.67, '38'),
('Fay Stamm', '243', 'free', 10.821, 106.576, '39'),
('Michael Green', '26', 'busy', 10.7657, 106.648, '4'),
('Joseph Green', '553', 'free', 10.7008, 106.663, '40'),
('Lilian Satterfield', '692', 'free', 10.8141, 106.581, '41'),
('Madelyn Kreiger', '470', 'busy', 10.686, 106.643, '42'),
('Jordyn Hane', '660', 'busy', 10.8097, 106.641, '43'),
('Raul Torphy', '240', 'busy', 10.7314, 106.671, '44'),
('Mrs. Jeremy Ferry', '448', 'busy', 10.8224, 106.605, '45'),
('Sabrina Hodkiewicz', '425', 'free', 10.723, 106.646, '46'),
('Warren Johns', '200', 'busy', 10.8585, 106.574, '47'),
('Delaney Johns', '300', 'busy', 10.7004, 106.694, '48'),
('Freddie Swaniawski', '529', 'busy', 10.8027, 106.577, '49'),
('Elmer Gislason MD', '904', 'free', 10.7759, 106.64, '5'),
('Sadye Konopelski', '815', 'busy', 10.7362, 106.699, '50'),
('Felipe Torp', '160', 'free', 10.8322, 106.54, '51'),
('Eleanore Hartmann', '468', 'busy', 10.6828, 106.734, '52'),
('Allene Wisozk', '39', 'busy', 10.8469, 106.559, '53'),
('Herminia Harris', '187', 'busy', 10.728, 106.646, '54'),
('Malcolm Osinski', '998', 'free', 10.8077, 106.622, '55'),
('Uriah Feest', '146', 'free', 10.6885, 106.735, '56'),
('Dr. Lilly Boyle', '311', 'busy', 10.799, 106.595, '57'),
('Darion Larkin', '255', 'free', 10.7557, 106.679, '58'),
('Columbus Carter Jr.', '777', 'busy', 10.8356, 106.639, '59'),
('Mr. Vergie Hickle', '795', 'busy', 10.7626, 106.642, '6'),
('Juliana Lindgren', '392', 'busy', 10.7326, 106.76, '60'),
('Mercedes Veum', '819', 'busy', 10.8788, 106.578, '61'),
('Sydni Von', '114', 'busy', 10.6536, 106.729, '62'),
('Wellington Oberbrunner', '624', 'busy', 10.8077, 106.564, '63'),
('Lonie Schuppe', '978', 'busy', 10.6867, 106.673, '64'),
('Flo Reinger DVM', '412', 'free', 10.8039, 106.548, '65'),
('Marta Lemke', '682', 'free', 10.7471, 106.693, '66'),
('Mable Klocko', '310', 'free', 10.8055, 106.595, '67'),
('Jeramy Collier', '46', 'free', 10.6891, 106.687, '68'),
('Jade Stroman', '712', 'free', 10.8266, 106.558, '69'),
('Ismael Crooks', '789', 'free', 10.7706, 106.634, '7'),
('Lew Zieme DDS', '826', 'free', 10.7451, 106.714, '70'),
('Willa Waters', '602', 'free', 10.826, 106.51, '71'),
('Alexandrea Schaefer', '119', 'free', 10.7175, 106.675, '72'),
('Ashleigh Ritchie', '903', 'busy', 10.9031, 106.613, '73'),
('Ephraim Vandervort IV', '650', 'free', 10.666, 106.719, '74'),
('Shana Moore I', '638', 'busy', 10.9047, 106.634, '75'),
('Odell Hand', '769', 'busy', 10.6607, 106.71, '76'),
('Anna Ullrich', '605', 'free', 10.9072, 106.575, '77'),
('Eldon Lindgren', '924', 'busy', 10.6817, 106.74, '78'),
('Casey Ryan', '215', 'free', 10.8583, 106.592, '79'),
('Woodrow Pfeffer DDS', '175', 'free', 10.7542, 106.645, '8'),
('Abel Daugherty', '19', 'busy', 10.6974, 106.796, '80'),
('Eusebio Gutkowski', '864', 'busy', 10.8852, 106.589, '81'),
('Sheila Cassin', '451', 'free', 10.6366, 106.805, '82'),
('Abigayle Bruen', '814', 'busy', 10.7909, 106.53, '83'),
('Marquise Spencer', '38', 'free', 10.6061, 106.696, '84'),
('Ellie Conroy', '8', 'free', 10.8014, 106.576, '85'),
('Trudie Mosciski', '36', 'busy', 10.6549, 106.664, '86'),
('Gwendolyn Altenwerth', '684', 'busy', 10.9069, 106.514, '87'),
('Vern Runolfsdottir', '369', 'free', 10.7082, 106.792, '88'),
('Ms. Madaline Veum', '575', 'free', 10.7781, 106.606, '89'),
('Miss Claude Leannon', '451', 'busy', 10.7719, 106.632, '9'),
('Jaden Greenfelder', '820', 'busy', 10.7224, 106.665, '90'),
('Marcel Jaskolski', '173', 'busy', 10.921, 106.486, '91'),
('Veronica White', '259', 'busy', 10.6426, 106.662, '92'),
('Wilson Bernhard', '204', 'busy', 10.8564, 106.612, '93'),
('Berenice Dickens', '71', 'busy', 10.5874, 106.654, '94'),
('Wilfred Corwin', '305', 'free', 10.7828, 106.638, '95'),
('Dr. Bettye Rohan', '7', 'busy', 10.649, 106.712, '96'),
('Trever Rosenbaum', '117', 'busy', 10.7767, 106.475, '97'),
('Deborah Graham', '720', 'busy', 10.7401, 106.69, '98'),
('Dasia McGlynn', '919', 'busy', 10.8362, 106.576, '99');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `point`
--

CREATE TABLE `point` (
  `id` int(11) NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT 'Địa chỉ đón khách',
  `type` int(1) NOT NULL COMMENT 'Loại xe (0: thường hoặc 1:PREMIUM) ',
  `note` text CHARACTER SET utf8mb4 NOT NULL COMMENT 'ghi chú'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
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
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `name`, `email`, `dob`, `role`) VALUES
(1, 'anhbap123', '$2a$10$10I8pXvL.LD7eF/XeWfkJOPI9D5p/WB7zzP6zPhjlQ5Hw3fleYqk6', 'hoang phat', 'thainguyenhoangphatit@gmail.com', 1509555600, 0),
(2, 'htahg1998', '$2a$10$94mpzXZkaQe3xjoKGy.vI..1r5JsBENGZwZWN.GT71CT26SgtQQ5m', 'Kira Kun', 'htahg1998@gmail.com', 1507654800, -1),
(3, 'lynhan', '$2a$10$DwVxO9CunmasqOqJAQajcuGRF8d85SY8OtXQO2QQ2EE.ZmuH.FRvy', 'ly thanh nhan', 'nhan@gmail.com', 1496768400, -1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`(10));

--
-- Chỉ mục cho bảng `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `point`
--
ALTER TABLE `point`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `point`
--
ALTER TABLE `point`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
