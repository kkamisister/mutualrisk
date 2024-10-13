-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: product
-- ------------------------------------------------------
-- Server version       8.0.39-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asset`
--

DROP TABLE IF EXISTS `asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asset` (
  `id` int NOT NULL AUTO_INCREMENT,
  `industry_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `region` varchar(50) DEFAULT NULL,
  `expected_return` double DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  `image_path` varchar(50) DEFAULT '/stockImage',
  `image_name` varchar(50) DEFAULT NULL,
  `summary` text,
  `recent_price` double DEFAULT NULL,
  `oldest_price` double DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `Market` varchar(25) DEFAULT NULL,
  `volatility` decimal(20,6) DEFAULT NULL,
  `sharpe_ratio` decimal(20,6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `industry_id` (`industry_id`),
  KEY `idx_code` (`code`),
  KEY `idx_sharpe_ratio` (`sharpe_ratio`),
  CONSTRAINT `asset_ibfk_1` FOREIGN KEY (`industry_id`) REFERENCES `industry` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16384 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `asset_covariance`
--

DROP TABLE IF EXISTS `asset_covariance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asset_covariance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `asset_id_1` int NOT NULL,
  `asset_id_2` int NOT NULL,
  `covariance` decimal(20,13) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `asset_id_1` (`asset_id_1`),
  KEY `asset_id_2` (`asset_id_2`),
  CONSTRAINT `asset_covariance_ibfk_1` FOREIGN KEY (`asset_id_1`) REFERENCES `asset` (`id`),
  CONSTRAINT `asset_covariance_ibfk_2` FOREIGN KEY (`asset_id_2`) REFERENCES `asset` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=197468499 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `asset_covariance_final`
--

DROP TABLE IF EXISTS `asset_covariance_final`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asset_covariance_final` (
  `id` int NOT NULL AUTO_INCREMENT,
  `asset_id_1` int NOT NULL,
  `asset_id_2` int NOT NULL,
  `covariance` double DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `asset_id_2` (`asset_id_2`),
  KEY `idx_asset_covariance` (`asset_id_1`,`asset_id_2`),
  CONSTRAINT `asset_covariance_final_ibfk_1` FOREIGN KEY (`asset_id_1`) REFERENCES `asset` (`id`),
  CONSTRAINT `asset_covariance_final_ibfk_2` FOREIGN KEY (`asset_id_2`) REFERENCES `asset` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95078597 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `asset_covariance_real`
--

DROP TABLE IF EXISTS `asset_covariance_real`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asset_covariance_real` (
  `id` int NOT NULL AUTO_INCREMENT,
  `asset_id_1` int NOT NULL,
  `asset_id_2` int NOT NULL,
  `covariance` decimal(20,13) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `asset_id_2` (`asset_id_2`),
  KEY `idx_asset_covariance` (`asset_id_1`,`asset_id_2`),
  CONSTRAINT `asset_covariance_real_ibfk_1` FOREIGN KEY (`asset_id_1`) REFERENCES `asset` (`id`),
  CONSTRAINT `asset_covariance_real_ibfk_2` FOREIGN KEY (`asset_id_2`) REFERENCES `asset` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93818597 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `asset_history`
--

DROP TABLE IF EXISTS `asset_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asset_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `asset_id` int NOT NULL,
  `date` datetime DEFAULT NULL,
  `price` double DEFAULT NULL,
  `daily_price_change_rate` decimal(10,2) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_asset_date_unique` (`asset_id`,`date`),
  KEY `idx_asset_id` (`asset_id`),
  KEY `idx_date` (`date`),
  KEY `idx_asset_date` (`asset_id`,`date`),
  CONSTRAINT `asset_history_ibfk_1` FOREIGN KEY (`asset_id`) REFERENCES `asset` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23609052 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `asset_history_real`
--

DROP TABLE IF EXISTS `asset_history_real`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asset_history_real` (
  `id` int NOT NULL AUTO_INCREMENT,
  `asset_id` int NOT NULL,
  `date` datetime DEFAULT NULL,
  `price` double DEFAULT NULL,
  `daily_price_change_rate` decimal(10,2) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_asset_date_unique` (`asset_id`,`date`),
  KEY `idx_asset_id` (`asset_id`),
  KEY `idx_date` (`date`),
  KEY `idx_asset_date` (`asset_id`,`date`),
  CONSTRAINT `asset_history_real_ibfk_1` FOREIGN KEY (`asset_id`) REFERENCES `asset` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31071782 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `asset_news`
--

DROP TABLE IF EXISTS `asset_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asset_news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `news_id` int NOT NULL,
  `asset_id` int NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `news_id` (`news_id`),
  KEY `asset_id` (`asset_id`),
  CONSTRAINT `asset_news_ibfk_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`),
  CONSTRAINT `asset_news_ibfk_2` FOREIGN KEY (`asset_id`) REFERENCES `asset` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48751 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `asset_news_test`
--

DROP TABLE IF EXISTS `asset_news_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asset_news_test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `news_test_id` int NOT NULL,
  `asset_id` int NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `news_test_id` (`news_test_id`),
  KEY `asset_id` (`asset_id`),
  CONSTRAINT `asset_news_test_ibfk_1` FOREIGN KEY (`news_test_id`) REFERENCES `news_test` (`id`),
  CONSTRAINT `asset_news_test_ibfk_2` FOREIGN KEY (`asset_id`) REFERENCES `asset` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13476 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `exchange_rates`
--

DROP TABLE IF EXISTS `exchange_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exchange_rates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cur_unit` varchar(10) NOT NULL,
  `ttb` decimal(10,2) NOT NULL,
  `tts` decimal(10,2) NOT NULL,
  `deal_bas_r` decimal(10,2) NOT NULL,
  `bkpr` decimal(10,2) NOT NULL,
  `yy_efee_r` decimal(10,2) NOT NULL,
  `ten_dd_efee_r` decimal(10,2) NOT NULL,
  `kftc_bkpr` decimal(10,2) NOT NULL,
  `kftc_deal_bas_r` decimal(10,2) NOT NULL,
  `cur_nm` varchar(50) NOT NULL,
  `ex_rate_date` date NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_date` (`ex_rate_date`)
) ENGINE=InnoDB AUTO_INCREMENT=3360 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `industry`
--

DROP TABLE IF EXISTS `industry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sector_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sector_id` (`sector_id`),
  CONSTRAINT `industry_ibfk_1` FOREIGN KEY (`sector_id`) REFERENCES `sector` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4096 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `interest_asset`
--

DROP TABLE IF EXISTS `interest_asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interest_asset` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `asset_id` int NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_asset_id` (`user_id`,`asset_id`),
  KEY `asset_id` (`asset_id`),
  CONSTRAINT `interest_asset_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `member` (`id`),
  CONSTRAINT `interest_asset_ibfk_2` FOREIGN KEY (`asset_id`) REFERENCES `asset` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=323 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `krx_etf_detail`
--

DROP TABLE IF EXISTS `krx_etf_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `krx_etf_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `asset_id` int NOT NULL,
  `code` varchar(10) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `asset_name` varchar(255) DEFAULT NULL,
  `stock_count` varchar(40) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `asset_id` (`asset_id`),
  KEY `idx_code` (`code`),
  KEY `idx_name` (`name`),
  CONSTRAINT `krx_etf_detail_ibfk_1` FOREIGN KEY (`asset_id`) REFERENCES `asset` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8192 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `krx_stock_detail`
--

DROP TABLE IF EXISTS `krx_stock_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `krx_stock_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `asset_id` int NOT NULL,
  `code` varchar(10) NOT NULL,
  `market_value` varchar(30) DEFAULT NULL,
  `PER` varchar(30) DEFAULT NULL,
  `PBR` varchar(30) DEFAULT NULL,
  `EPS` varchar(30) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `asset_id` (`asset_id`),
  KEY `idx_code` (`code`),
  CONSTRAINT `krx_stock_detail_ibfk_1` FOREIGN KEY (`asset_id`) REFERENCES `asset` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27150 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `krx_stock_trend`
--

DROP TABLE IF EXISTS `krx_stock_trend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `krx_stock_trend` (
  `id` int NOT NULL AUTO_INCREMENT,
  `asset_id` int NOT NULL,
  `code` varchar(10) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `foreigner_pure_buy_quant` int DEFAULT NULL,
  `foreigner_hold_ratio` decimal(5,2) DEFAULT NULL,
  `organ_pure_buy_quant` int DEFAULT NULL,
  `individual_pure_buy_quant` int DEFAULT NULL,
  `accumulated_trading_volume` int DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `asset_id` (`asset_id`),
  KEY `idx_asset` (`code`),
  KEY `idx_date` (`date`),
  CONSTRAINT `krx_stock_trend_ibfk_1` FOREIGN KEY (`asset_id`) REFERENCES `asset` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=212985 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `oauth_id` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `oauth_id` (`oauth_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text,
  `content` text,
  `link` text,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89671 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `news_test`
--

DROP TABLE IF EXISTS `news_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news_test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text,
  `content` text,
  `link` text,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_published_at` (`published_at`)
) ENGINE=InnoDB AUTO_INCREMENT=7262 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `portfolio`
--

DROP TABLE IF EXISTS `portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `portfolio_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recommend_asset`
--

DROP TABLE IF EXISTS `recommend_asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recommend_asset` (
  `id` int NOT NULL AUTO_INCREMENT,
  `asset_id` int NOT NULL,
  `portfolio_id` int NOT NULL,
  `sharpe_ratio_diff` decimal(4,2) DEFAULT NULL,
  `return_diff` decimal(4,2) DEFAULT NULL,
  `volatility_diff` decimal(8,7) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `asset_id` (`asset_id`),
  KEY `portfolio_id` (`portfolio_id`),
  CONSTRAINT `recommend_asset_ibfk_1` FOREIGN KEY (`asset_id`) REFERENCES `asset` (`id`),
  CONSTRAINT `recommend_asset_ibfk_2` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sector`
--

DROP TABLE IF EXISTS `sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sector` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-11 12:58:03
