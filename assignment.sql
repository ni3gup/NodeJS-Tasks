-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2020 at 07:58 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assignment`
--

-- --------------------------------------------------------

--
-- Table structure for table `reimbursements`
--

CREATE TABLE `reimbursements` (
  `id` int(11) NOT NULL,
  `reimbursement_type_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `from_place` varchar(100) NOT NULL,
  `to_place` varchar(100) NOT NULL,
  `purpose` enum('market_visit','other_city_travel','office_visit','training','other') DEFAULT NULL,
  `other_purpose` varchar(255) DEFAULT NULL,
  `mode` enum('bike','bike','taxi','train','auto','other') DEFAULT NULL,
  `other_mode` varchar(255) DEFAULT NULL,
  `km` int(11) DEFAULT NULL,
  `inv_no` varchar(100) DEFAULT NULL,
  `amt` int(11) NOT NULL,
  `attachement` varchar(255) DEFAULT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `hotel_name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reimbursements`
--

INSERT INTO `reimbursements` (`id`, `reimbursement_type_id`, `date`, `from_place`, `to_place`, `purpose`, `other_purpose`, `mode`, `other_mode`, `km`, `inv_no`, `amt`, `attachement`, `from_date`, `to_date`, `hotel_name`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2020-01-01', 'Mumbai', 'Pune', 'other_city_travel', NULL, 'train', NULL, 250, '1234', 650, 'uploads/conveyance-2020-01-01-1597297402836.jpeg', '0000-00-00', '0000-00-00', '', '2020-08-13 05:43:23', '2020-08-13 05:43:23'),
(2, 1, '2020-01-01', 'Mumbai (Churchgate)', 'Mumbai (Andheri)', 'training', NULL, 'taxi', NULL, 35, '3575', 250, 'uploads/conveyance-2020-01-01-1597297403092.pdf', '0000-00-00', '0000-00-00', '', '2020-08-13 05:43:23', '2020-08-13 05:43:23'),
(3, 2, '2020-01-01', '', '', NULL, NULL, NULL, NULL, NULL, '1234', 4500, 'uploads/hotel-2020-01-01-1597297681386.jpeg', '2020-01-01', '2020-01-05', 'JW Marriot', '2020-08-13 05:48:01', '2020-08-13 05:48:01'),
(4, 3, '2020-01-01', '', '', NULL, NULL, NULL, NULL, NULL, '1234', 4500, 'uploads/food-2020-01-01-1597297842341.jpeg', '0000-00-00', '0000-00-00', '', '2020-08-13 05:50:42', '2020-08-13 05:50:42'),
(5, 4, '2020-01-01', '', '', NULL, NULL, NULL, NULL, NULL, '1234', 4500, 'uploads/mobile-2020-01-01-1597297923217.jpeg', '0000-00-00', '0000-00-00', '', '2020-08-13 05:52:03', '2020-08-13 05:52:03'),
(6, 5, '2020-01-01', '', '', NULL, NULL, NULL, NULL, NULL, '1234', 4500, 'uploads/internet-2020-01-01-1597298129989.jpeg', '0000-00-00', '0000-00-00', '', '2020-08-13 05:55:29', '2020-08-13 05:55:29');

-- --------------------------------------------------------

--
-- Table structure for table `reimbursement_types`
--

CREATE TABLE `reimbursement_types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reimbursement_types`
--

INSERT INTO `reimbursement_types` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'conveyance', '2020-08-12 13:07:08', '2020-08-12 13:07:08'),
(2, 'hotel', '2020-08-12 13:07:08', '2020-08-12 13:07:08'),
(3, 'food', '2020-08-12 13:07:08', '2020-08-12 13:07:08'),
(4, 'mobile', '2020-08-12 13:07:08', '2020-08-12 13:07:08'),
(5, 'internet', '2020-08-12 13:07:08', '2020-08-12 13:07:08'),
(6, 'other', '2020-08-12 13:07:08', '2020-08-12 13:07:08');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `working_type` varchar(255) DEFAULT NULL,
  `start` time DEFAULT NULL,
  `end` time DEFAULT NULL,
  `store_id` varchar(255) DEFAULT NULL,
  `store_name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `date`, `employee_id`, `name`, `working_type`, `start`, `end`, `store_id`, `store_name`, `createdAt`, `updatedAt`) VALUES
(1, '2019-10-15', 1237780, 'kimmy', 'working time', '08:00:00', '19:00:00', 'RAJD6000883', 'Junbo Store', '2020-08-12 12:15:44', '2020-08-12 12:15:44'),
(2, '2019-10-15', 1237780, 'kimmy', 'lunch', '12:00:00', '13:00:00', 'RAJD6000883', '', '2020-08-12 12:15:44', '2020-08-12 12:15:44'),
(3, '2019-10-15', 1237780, 'kimmy', 'break', '15:00:00', '15:30:00', 'RAJD6000883', '', '2020-08-12 12:15:44', '2020-08-12 12:15:44'),
(4, '2019-10-15', 1237780, 'kimmy', 'training', '16:00:00', '17:00:00', 'RAJD6000883', 'Multiplex samsung', '2020-08-12 12:15:44', '2020-08-12 12:15:44'),
(5, '2019-10-15', 1237780, 'kimmy', 'route', '18:00:00', '19:00:00', 'RAJD6000883', 'ABC Mart', '2020-08-12 12:15:44', '2020-08-12 12:15:44'),
(6, '2019-10-16', 1237780, 'kimmy', 'day off', '18:00:00', '19:00:00', 'RAJD6000883', '', '2020-08-12 12:15:44', '2020-08-12 12:15:44'),
(7, '2019-10-17', 1237780, 'kimmy', 'leave', '18:00:00', '19:00:00', 'RAJD6000883', '', '2020-08-12 12:15:44', '2020-08-12 12:15:44'),
(8, '2019-10-18', 1237780, 'kimmy', 'leave', '18:00:00', '19:00:00', 'RAJD6000883', '', '2020-08-12 12:15:44', '2020-08-12 12:15:44'),
(9, '2019-10-19', 1237780, 'kimmy', 'leave', '18:00:00', '19:00:00', 'RAJD6000883', '', '2020-08-12 12:15:44', '2020-08-12 12:15:44');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20200812095845-create-schedule.js'),
('20200812123207-create-reimbursement-types.js'),
('20200812123207-create-reimbursement.js'),
('20200812123957-create-reimbursement.js');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reimbursements`
--
ALTER TABLE `reimbursements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reimbursement_types`
--
ALTER TABLE `reimbursement_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reimbursements`
--
ALTER TABLE `reimbursements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reimbursement_types`
--
ALTER TABLE `reimbursement_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
