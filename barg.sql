-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 19, 2017 at 05:54 PM
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
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `plate_id` varchar(50) CHARACTER SET utf8 NOT NULL,
  `status` text CHARACTER SET utf8 NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`name`, `plate_id`, `status`, `lat`, `lng`, `id`) VALUES
('Verner Moore', '406', 'free', 10.7667, 106.642, 0),
('Rylan Rutherford', '331', 'free', 10.7669, 106.641, 1),
('Zelma Wyman', '931', 'free', 10.7652, 106.644, 2),
('Celestine Block I', '884', 'free', 10.7667, 106.639, 3),
('Michael Green', '26', 'free', 10.7657, 106.648, 4),
('Elmer Gislason MD', '904', 'free', 10.7759, 106.64, 5),
('Mr. Vergie Hickle', '795', 'free', 10.7626, 106.642, 6),
('Ismael Crooks', '789', 'free', 10.7706, 106.634, 7),
('Woodrow Pfeffer DDS', '175', 'free', 10.7542, 106.645, 8),
('Miss Claude Leannon', '451', 'free', 10.7719, 106.632, 9),
('Claudia Conroy', '299', 'free', 10.7493, 106.642, 10),
('Damon Bradtke III', '137', 'free', 10.7777, 106.625, 11),
('Ms. Darrick Wehner', '150', 'free', 10.7617, 106.651, 12),
('Pattie Ondricka', '362', 'free', 10.7708, 106.632, 13),
('Manuela Casper', '917', 'free', 10.739, 106.648, 14),
('Ms. Chester Will', '241', 'free', 10.7698, 106.628, 15),
('Giuseppe Nader', '376', 'free', 10.7564, 106.67, 16),
('Pascale Bins Sr.', '713', 'free', 10.7903, 106.638, 17),
('Jordy Lemke', '486', 'free', 10.7578, 106.669, 18),
('Keshawn Stark', '102', 'free', 10.7722, 106.621, 19),
('Madelyn Emmerich', '143', 'free', 10.7501, 106.646, 20),
('Ryder Kuphal', '559', 'free', 10.8002, 106.638, 21),
('Janiya Crooks', '609', 'free', 10.7462, 106.677, 22),
('Paul Schuppe', '74', 'free', 10.7872, 106.638, 23),
('Adam Hodkiewicz', '175', 'free', 10.72, 106.673, 24),
('Lyda Schuster', '879', 'free', 10.8119, 106.632, 25),
('Simone Ullrich', '451', 'free', 10.7341, 106.68, 26),
('Delaney Lubowitz', '86', 'free', 10.7863, 106.607, 27),
('Destany Dickens', '918', 'free', 10.7229, 106.692, 28),
('Cruz Smitham', '496', 'free', 10.7673, 106.633, 29),
('Emory Kulas', '351', 'free', 10.722, 106.682, 30),
('Lisa Corkery', '711', 'free', 10.8047, 106.586, 31),
('Quentin Ernser', '121', 'free', 10.7053, 106.686, 32),
('Tristin Bechtelar', '525', 'free', 10.7775, 106.603, 33),
('Mrs. Julio Lubowitz', '977', 'free', 10.7034, 106.691, 34),
('Quincy Reichel', '599', 'free', 10.8041, 106.624, 35),
('Bethany Pacocha', '541', 'free', 10.7139, 106.659, 36),
('Leonora Swaniawski', '791', 'free', 10.7841, 106.612, 37),
('Ms. Renee Hagenes', '525', 'free', 10.7647, 106.67, 38),
('Fay Stamm', '243', 'free', 10.821, 106.576, 39),
('Joseph Green', '553', 'free', 10.7008, 106.663, 40),
('Lilian Satterfield', '692', 'free', 10.8141, 106.581, 41),
('Madelyn Kreiger', '470', 'free', 10.686, 106.643, 42),
('Jordyn Hane', '660', 'free', 10.8097, 106.641, 43),
('Raul Torphy', '240', 'free', 10.7314, 106.671, 44),
('Mrs. Jeremy Ferry', '448', 'free', 10.8224, 106.605, 45),
('Sabrina Hodkiewicz', '425', 'free', 10.723, 106.646, 46),
('Warren Johns', '200', 'free', 10.8585, 106.574, 47),
('Delaney Johns', '300', 'free', 10.7004, 106.694, 48),
('Freddie Swaniawski', '529', 'free', 10.8027, 106.577, 49),
('Sadye Konopelski', '815', 'free', 10.7362, 106.699, 50),
('Felipe Torp', '160', 'free', 10.8322, 106.54, 51),
('Eleanore Hartmann', '468', 'free', 10.6828, 106.734, 52),
('Allene Wisozk', '39', 'free', 10.8469, 106.559, 53),
('Herminia Harris', '187', 'free', 10.728, 106.646, 54),
('Malcolm Osinski', '998', 'free', 10.8077, 106.622, 55),
('Uriah Feest', '146', 'free', 10.6885, 106.735, 56),
('Dr. Lilly Boyle', '311', 'free', 10.799, 106.595, 57),
('Darion Larkin', '255', 'free', 10.7557, 106.679, 58),
('Columbus Carter Jr.', '777', 'free', 10.8356, 106.639, 59),
('Juliana Lindgren', '392', 'free', 10.7326, 106.76, 60),
('Mercedes Veum', '819', 'free', 10.8788, 106.578, 61),
('Sydni Von', '114', 'free', 10.6536, 106.729, 62),
('Wellington Oberbrunner', '624', 'free', 10.8077, 106.564, 63),
('Lonie Schuppe', '978', 'free', 10.6867, 106.673, 64),
('Flo Reinger DVM', '412', 'free', 10.8039, 106.548, 65),
('Marta Lemke', '682', 'free', 10.7471, 106.693, 66),
('Mable Klocko', '310', 'free', 10.8055, 106.595, 67),
('Jeramy Collier', '46', 'free', 10.6891, 106.687, 68),
('Jade Stroman', '712', 'free', 10.8266, 106.558, 69),
('Lew Zieme DDS', '826', 'free', 10.7451, 106.714, 70),
('Willa Waters', '602', 'free', 10.826, 106.51, 71),
('Alexandrea Schaefer', '119', 'free', 10.7175, 106.675, 72),
('Ashleigh Ritchie', '903', 'free', 10.9031, 106.613, 73),
('Ephraim Vandervort IV', '650', 'free', 10.666, 106.719, 74),
('Shana Moore I', '638', 'free', 10.9047, 106.634, 75),
('Odell Hand', '769', 'free', 10.6607, 106.71, 76),
('Anna Ullrich', '605', 'free', 10.9072, 106.575, 77),
('Eldon Lindgren', '924', 'free', 10.6817, 106.74, 78),
('Casey Ryan', '215', 'free', 10.8583, 106.592, 79),
('Abel Daugherty', '19', 'free', 10.6974, 106.796, 80),
('Eusebio Gutkowski', '864', 'free', 10.8852, 106.589, 81),
('Sheila Cassin', '451', 'free', 10.6366, 106.805, 82),
('Abigayle Bruen', '814', 'free', 10.7909, 106.53, 83),
('Marquise Spencer', '38', 'free', 10.6061, 106.696, 84),
('Ellie Conroy', '8', 'free', 10.8014, 106.576, 85),
('Trudie Mosciski', '36', 'free', 10.6549, 106.664, 86),
('Gwendolyn Altenwerth', '684', 'free', 10.9069, 106.514, 87),
('Vern Runolfsdottir', '369', 'free', 10.7082, 106.792, 88),
('Ms. Madaline Veum', '575', 'free', 10.7781, 106.606, 89),
('Jaden Greenfelder', '820', 'free', 10.7224, 106.665, 90),
('Marcel Jaskolski', '173', 'free', 10.921, 106.486, 91),
('Veronica White', '259', 'free', 10.6426, 106.662, 92),
('Wilson Bernhard', '204', 'free', 10.8564, 106.612, 93),
('Berenice Dickens', '71', 'free', 10.5874, 106.654, 94),
('Wilfred Corwin', '305', 'free', 10.7828, 106.638, 95),
('Dr. Bettye Rohan', '7', 'free', 10.649, 106.712, 96),
('Trever Rosenbaum', '117', 'free', 10.7767, 106.475, 97),
('Deborah Graham', '720', 'free', 10.7401, 106.69, 98),
('Dasia McGlynn', '919', 'free', 10.8362, 106.576, 99);

-- --------------------------------------------------------

--
-- Table structure for table `point`
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
(1, 'locater01', '$2a$10$PujgmzlvRBR1ehaLawTGwe/WzqtsesO5CPUdBUXm0aFJzltaRySO2', 'locater01', 'locater01@gmail.com', 1509469200, -1),
(2, 'phone', '$2a$10$3DPHTW6ylZ7U4LIxBTZaPe0wi4tx81vkPvV5wSY4TfIUTKJ7ny4Pq', 'phone1', '123321@gmail.com', 1510506000, -1),
(3, 'phonis01', '$2a$10$YACPBKWfe..ydHIBQTJmrOKMh5htVJ3.O9VwjLzeQDBl.V98jpdM6', 'phonis 01', 'phonis01@gmail.com', 1509469200, -1),
(4, 'admin', '$2a$10$POkqF9mhYzgzmlYWKFyww.QSXP0NKCX8XnCfVjqb7MB1FZfM2IgSq', 'admin 123', 'admin@gmail.com', 1509469200, -1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `point`
--
ALTER TABLE `point`
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
-- AUTO_INCREMENT for table `point`
--
ALTER TABLE `point`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
