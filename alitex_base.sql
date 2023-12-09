-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 09, 2023 at 04:07 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alit`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `activity_id` varchar(255) NOT NULL,
  `type_activity` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `data` text DEFAULT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_logs`
--

-- --------------------------------------------------------

--
-- Table structure for table `buys`
--

CREATE TABLE `buys` (
  `buy_id` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `ordinal_number` int(11) NOT NULL,
  `vendor_id` varchar(255) NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `date_invoice` date DEFAULT NULL,
  `pay_type` varchar(50) DEFAULT NULL,
  `end_pay_date` date DEFAULT NULL,
  `send_date` date DEFAULT NULL,
  `number_send_invoice` varchar(100) DEFAULT NULL,
  `tax` int(11) DEFAULT NULL,
  `amount` bigint(20) DEFAULT NULL,
  `total` bigint(20) DEFAULT 0,
  `status` varchar(255) DEFAULT NULL,
  `amount_pay` bigint(20) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buys`
--
-- --------------------------------------------------------

--
-- Table structure for table `buy_items`
--

CREATE TABLE `buy_items` (
  `item_id` varchar(255) NOT NULL,
  `buy_id` varchar(255) NOT NULL,
  `inventory_id` varchar(255) NOT NULL,
  `warehouse_id` varchar(255) NOT NULL,
  `price` bigint(20) NOT NULL,
  `qty` int(11) NOT NULL,
  `tax` int(11) NOT NULL,
  `tax_name` varchar(10) NOT NULL,
  `amount` bigint(20) NOT NULL,
  `total` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buy_items`
--

-- --------------------------------------------------------

--
-- Table structure for table `cash_flows`
--

CREATE TABLE `cash_flows` (
  `id` int(11) NOT NULL,
  `relation_id` varchar(255) NOT NULL,
  `type_relation` varchar(50) NOT NULL,
  `customer_id` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `ordinal_number` int(11) NOT NULL,
  `amount` bigint(20) NOT NULL,
  `date_payment` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact_types`
--

CREATE TABLE `contact_types` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_types`
--

INSERT INTO `contact_types` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Customer', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Vendor', '2023-05-29 15:45:21', '0000-00-00 00:00:00'),
(3, 'Owner', '2023-05-29 15:45:21', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `customer_id` varchar(255) NOT NULL,
  `contact_id` int(11) NOT NULL DEFAULT 1,
  `customer_code` varchar(255) DEFAULT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_status` varchar(255) NOT NULL,
  `customer_npwp_number` varchar(255) DEFAULT NULL,
  `customer_address` text DEFAULT NULL,
  `customer_pic_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `customer_phone_number` varchar(255) DEFAULT NULL,
  `customer_country_code` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `customer_id`, `contact_id`, `customer_code`, `customer_name`, `customer_status`, `customer_npwp_number`, `customer_address`, `customer_pic_name`, `customer_email`, `customer_phone_number`, `customer_country_code`, `created_at`, `updated_at`) VALUES
(1, 'CUSe826c7ee1cd1e35e7c0e372c18', 3, 'A0001', 'CV Alitex oe', 'PKP', '12.312.312.3-243.123', 'Bandung', 'Ricky', 'Ricky.hilmi@gmail.com', '6274837483227', '62', '2023-12-08 18:00:43', '2023-12-09 02:56:29');

-- --------------------------------------------------------

--
-- Table structure for table `history_stocks`
--

CREATE TABLE `history_stocks` (
  `history_id` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `ordinal_number` int(11) NOT NULL,
  `warehouse_id` varchar(255) NOT NULL,
  `inventory_id` varchar(255) NOT NULL,
  `sell_id` varchar(255) DEFAULT NULL,
  `buy_id` varchar(255) DEFAULT NULL,
  `type` varchar(10) NOT NULL,
  `price` bigint(20) DEFAULT 0,
  `stock_qty` int(11) NOT NULL,
  `qty_before` int(11) NOT NULL,
  `qty_after` int(11) NOT NULL,
  `date` date NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history_stocks`
--

-- --------------------------------------------------------

--
-- Table structure for table `inventories`
--

CREATE TABLE `inventories` (
  `inventory_id` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `ordinal_number` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `capital_price` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `category_id` varchar(255) NOT NULL,
  `merk_id` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventories`
--

-- --------------------------------------------------------

--
-- Table structure for table `inventory_name_customers`
--

CREATE TABLE `inventory_name_customers` (
  `id` int(11) NOT NULL,
  `customer_id` varchar(100) NOT NULL,
  `inventory_id` varchar(100) NOT NULL,
  `inventory_name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_name_customers`
--


-- --------------------------------------------------------

--
-- Table structure for table `inventory_notes`
--

CREATE TABLE `inventory_notes` (
  `id` int(11) NOT NULL,
  `inventory_id` varchar(100) NOT NULL,
  `note` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_notes`
--

-- --------------------------------------------------------

--
-- Table structure for table `pay_buy_histories`
--

CREATE TABLE `pay_buy_histories` (
  `history_id` varchar(255) NOT NULL,
  `buy_id` varchar(255) NOT NULL,
  `ordinal_number` int(11) NOT NULL,
  `amount` bigint(20) NOT NULL,
  `date_payment` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pay_histories`
--

CREATE TABLE `pay_histories` (
  `history_id` varchar(255) NOT NULL,
  `sell_id` varchar(255) NOT NULL,
  `ordinal_number` int(11) NOT NULL,
  `amount` bigint(20) NOT NULL,
  `date_payment` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pay_histories`
--

-- --------------------------------------------------------

--
-- Table structure for table `price_buy_customers`
--

CREATE TABLE `price_buy_customers` (
  `id` int(11) NOT NULL,
  `customer_id` varchar(100) NOT NULL,
  `inventory_id` varchar(100) NOT NULL,
  `price` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `price_buy_customers`
--

-- --------------------------------------------------------

--
-- Table structure for table `price_sell_customers`
--

CREATE TABLE `price_sell_customers` (
  `id` int(11) NOT NULL,
  `customer_id` varchar(100) NOT NULL,
  `inventory_id` varchar(100) NOT NULL,
  `price` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `price_sell_customers`
--

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', '2023-01-27 16:23:45', NULL),
(2, 'Admin', '2023-01-27 16:23:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sells`
--

CREATE TABLE `sells` (
  `sell_id` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `ordinal_number` int(11) NOT NULL,
  `customer_id` varchar(255) NOT NULL,
  `date_invoice` date DEFAULT NULL,
  `pay_type` varchar(50) DEFAULT NULL,
  `end_pay_date` date DEFAULT NULL,
  `warehouse_id` varchar(255) DEFAULT NULL,
  `send_date` date DEFAULT NULL,
  `number_send_invoice` varchar(100) DEFAULT NULL,
  `tax` int(11) DEFAULT NULL,
  `amount` bigint(20) DEFAULT NULL,
  `total` bigint(20) DEFAULT 0,
  `status` varchar(255) DEFAULT NULL,
  `amount_pay` bigint(20) DEFAULT 0,
  `reference_number` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sells`
--

-- --------------------------------------------------------

--
-- Table structure for table `sell_items`
--

CREATE TABLE `sell_items` (
  `item_id` varchar(255) NOT NULL,
  `sell_id` varchar(255) NOT NULL,
  `inventory_id` varchar(255) NOT NULL,
  `price` bigint(20) NOT NULL,
  `qty` int(11) NOT NULL,
  `tax` int(11) NOT NULL,
  `tax_name` varchar(10) DEFAULT NULL,
  `amount` bigint(20) NOT NULL,
  `total` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sell_items`
--

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20210531014517-create-user.js'),
('20220306213628-create-activity-log.js'),
('20220306213628-create-customer.js'),
('20220306213628-create-inventory-variation.js'),
('20220306213628-create-inventory.js'),
('20220306213628-create-role.js'),
('20220306213628-create-type-inventory.js');

-- --------------------------------------------------------

--
-- Table structure for table `status_payments`
--

CREATE TABLE `status_payments` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status_payments`
--

INSERT INTO `status_payments` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'unpaid', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'partial_paid', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'paid', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'over_unpaid', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'retur', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `stock_warehouses`
--

CREATE TABLE `stock_warehouses` (
  `id` int(11) NOT NULL,
  `warehouse_id` varchar(255) NOT NULL,
  `inventory_id` varchar(255) NOT NULL,
  `stock_qty` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock_warehouses`
--

-- --------------------------------------------------------

--
-- Table structure for table `type_inventories`
--

CREATE TABLE `type_inventories` (
  `type_id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `code` varchar(3) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `type_inventories`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `hash_password` text NOT NULL,
  `profile_picture` text DEFAULT NULL,
  `token` text DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `full_name`, `role`, `hash_password`, `profile_picture`, `token`, `last_login`, `created_at`, `updated_at`) VALUES
('ROWe826c6e81adee45d7e0c38271f', 'admin', 'Admin', 2, 'e822cdea1bd1e253', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyMy0xMi0wOVQwMjozNTo1Mi40NjBaIiwiaWF0IjoxNzAyMDg5MzUyfQ.XIlpGgjwI7QsDorPD7kbm-Gsci6G82gZrsPZXkaHabU', '2023-12-09 02:35:52', '2023-06-11 13:53:33', '2023-12-09 02:35:52');

-- --------------------------------------------------------

--
-- Table structure for table `variation_inventories`
--

CREATE TABLE `variation_inventories` (
  `variation_id` varchar(255) NOT NULL,
  `inventory_id` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `ordinal_number` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `variation_inventories`
--

-- --------------------------------------------------------

--
-- Table structure for table `warehouses`
--

CREATE TABLE `warehouses` (
  `warehouse_id` varchar(255) NOT NULL,
  `warehouse_name` varchar(255) NOT NULL,
  `warehouse_city` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `warehouses`
--

INSERT INTO `warehouses` (`warehouse_id`, `warehouse_name`, `warehouse_city`, `created_at`, `updated_at`) VALUES
('Bandung', 'Bandung', 1, '2023-05-26 06:22:44', NULL),
('Jakarta', 'Jakarta', 1, '2023-05-26 06:23:01', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`activity_id`);

--
-- Indexes for table `buys`
--
ALTER TABLE `buys`
  ADD PRIMARY KEY (`buy_id`);

--
-- Indexes for table `buy_items`
--
ALTER TABLE `buy_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `buy_id` (`buy_id`),
  ADD KEY `inventory_id` (`inventory_id`),
  ADD KEY `warehouse_id` (`warehouse_id`);

--
-- Indexes for table `cash_flows`
--
ALTER TABLE `cash_flows`
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `contact_types`
--
ALTER TABLE `contact_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `customer_type` (`contact_id`);

--
-- Indexes for table `history_stocks`
--
ALTER TABLE `history_stocks`
  ADD KEY `inventory_id` (`inventory_id`),
  ADD KEY `sell_id` (`sell_id`),
  ADD KEY `buy_id` (`buy_id`);

--
-- Indexes for table `inventories`
--
ALTER TABLE `inventories`
  ADD PRIMARY KEY (`inventory_id`);

--
-- Indexes for table `inventory_name_customers`
--
ALTER TABLE `inventory_name_customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_notes`
--
ALTER TABLE `inventory_notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pay_buy_histories`
--
ALTER TABLE `pay_buy_histories`
  ADD KEY `buy_id` (`buy_id`);

--
-- Indexes for table `pay_histories`
--
ALTER TABLE `pay_histories`
  ADD KEY `sell_id` (`sell_id`);

--
-- Indexes for table `price_buy_customers`
--
ALTER TABLE `price_buy_customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `inventory_id` (`inventory_id`,`customer_id`);

--
-- Indexes for table `price_sell_customers`
--
ALTER TABLE `price_sell_customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `inventory_id` (`inventory_id`,`customer_id`) USING BTREE;

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `sells`
--
ALTER TABLE `sells`
  ADD PRIMARY KEY (`sell_id`),
  ADD KEY `warehouse_id` (`warehouse_id`);

--
-- Indexes for table `sell_items`
--
ALTER TABLE `sell_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `sell_id` (`sell_id`),
  ADD KEY `inventory_id` (`inventory_id`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `status_payments`
--
ALTER TABLE `status_payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock_warehouses`
--
ALTER TABLE `stock_warehouses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventory_id` (`inventory_id`);

--
-- Indexes for table `type_inventories`
--
ALTER TABLE `type_inventories`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `variation_inventories`
--
ALTER TABLE `variation_inventories`
  ADD KEY `variation_id` (`variation_id`);

--
-- Indexes for table `warehouses`
--
ALTER TABLE `warehouses`
  ADD PRIMARY KEY (`warehouse_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_types`
--
ALTER TABLE `contact_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `inventory_name_customers`
--
ALTER TABLE `inventory_name_customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `inventory_notes`
--
ALTER TABLE `inventory_notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `price_buy_customers`
--
ALTER TABLE `price_buy_customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `price_sell_customers`
--
ALTER TABLE `price_sell_customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `status_payments`
--
ALTER TABLE `status_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stock_warehouses`
--
ALTER TABLE `stock_warehouses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buy_items`
--
ALTER TABLE `buy_items`
  ADD CONSTRAINT `buy_items_ibfk_1` FOREIGN KEY (`buy_id`) REFERENCES `buys` (`buy_id`),
  ADD CONSTRAINT `buy_items_ibfk_2` FOREIGN KEY (`inventory_id`) REFERENCES `inventories` (`inventory_id`),
  ADD CONSTRAINT `buy_items_ibfk_3` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`warehouse_id`);

--
-- Constraints for table `cash_flows`
--
ALTER TABLE `cash_flows`
  ADD CONSTRAINT `cash_flows_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `contact_types` (`id`);

--
-- Constraints for table `history_stocks`
--
ALTER TABLE `history_stocks`
  ADD CONSTRAINT `history_stocks_ibfk_1` FOREIGN KEY (`inventory_id`) REFERENCES `inventories` (`inventory_id`);

--
-- Constraints for table `pay_buy_histories`
--
ALTER TABLE `pay_buy_histories`
  ADD CONSTRAINT `pay_buy_histories_ibfk_1` FOREIGN KEY (`buy_id`) REFERENCES `buys` (`buy_id`);

--
-- Constraints for table `pay_histories`
--
ALTER TABLE `pay_histories`
  ADD CONSTRAINT `pay_histories_ibfk_1` FOREIGN KEY (`sell_id`) REFERENCES `sells` (`sell_id`);

--
-- Constraints for table `sells`
--
ALTER TABLE `sells`
  ADD CONSTRAINT `sells_ibfk_1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`warehouse_id`);

--
-- Constraints for table `sell_items`
--
ALTER TABLE `sell_items`
  ADD CONSTRAINT `sell_items_ibfk_1` FOREIGN KEY (`sell_id`) REFERENCES `sells` (`sell_id`),
  ADD CONSTRAINT `sell_items_ibfk_2` FOREIGN KEY (`inventory_id`) REFERENCES `inventories` (`inventory_id`);

--
-- Constraints for table `stock_warehouses`
--
ALTER TABLE `stock_warehouses`
  ADD CONSTRAINT `stock_warehouses_ibfk_1` FOREIGN KEY (`inventory_id`) REFERENCES `inventories` (`inventory_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
