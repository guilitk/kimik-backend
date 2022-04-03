-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.6.5-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para kimik
DROP DATABASE IF EXISTS `kimikdb`;
CREATE DATABASE IF NOT EXISTS `kimikdb` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;
USE `kimikdb`;

-- Copiando estrutura para tabela kimik.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `refresh_token_expire` datetime DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela kimik.users: ~3 rows (aproximadamente)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`username`, `email`, `password`, `name`, `refresh_token`, `refresh_token_expire`) VALUES
	('jagu', NULL, '$2b$10$Wd5CvAXo1l/Ww1x8zcjwneTcEK/3DKz34iTvA26kETXa4gOR6k9oW', NULL, '27FOTkI9GbVTrOhLM6p3Zq197A2', '2022-04-03 12:12:56'),
	('opa', 'dklas', '$2b$10$ZToy/OSFJ882lNDfSKRIhe5kVTN1.ihF8Q/P9Zxz0IPQGNBX3Et5u', 'dasdas', '27FOJMDjMEPV4u13YoeZWjODmhX', '2022-04-03 12:11:34'),
	('zebu', 'dasdsa', '$2b$10$rjNhwKav4JG87kmBsVvFuOW6yRkZ/JaubB7G1fvifDTBJCuKVjvyi', 'hrthr', '27FMj6r6NAAX5PcDEiqElvDps1W', '2022-04-03 11:58:32');

-- Copiando estrutura para tabela kimik.calculations
DROP TABLE IF EXISTS `calculations`;
CREATE TABLE IF NOT EXISTS `calculations` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `created_on` datetime NOT NULL,
  `calculation` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`calculation`)),
  PRIMARY KEY (`id`),
  KEY `calculations_username` (`username`),
  CONSTRAINT `calculations_username` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela kimik.calculations: ~1 rows (aproximadamente)
DELETE FROM `calculations`;
/*!40000 ALTER TABLE `calculations` DISABLE KEYS */;
INSERT INTO `calculations` (`id`, `username`, `created_on`, `calculation`) VALUES
	('5cc3613d-d2dc-4f3b-9ceb-515168404ebf', 'jagu', '2022-04-02 12:36:31', '{"chemical":"boric","concentration":0.01,"purity":100,"mass":4.9018}');
/*!40000 ALTER TABLE `calculations` ENABLE KEYS */;


/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
