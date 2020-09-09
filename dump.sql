-- MariaDB dump 10.17  Distrib 10.4.13-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: blog_viajes
-- ------------------------------------------------------
-- Server version	10.4.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `autores`
--

DROP TABLE IF EXISTS `autores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `autores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `pseudonimo` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autores`
--

LOCK TABLES `autores` WRITE;
/*!40000 ALTER TABLE `autores` DISABLE KEYS */;
INSERT INTO `autores` VALUES (1,'luis@email.com','123123','luis2000',NULL),(2,'ana@email.com','123123','a55555',NULL),(3,'luis@2','1884','caco',NULL),(4,'francodemetrio87@gmail.com','1884','Caco87',NULL),(5,'ara74@gmail.com','1884','Ara',NULL),(6,'bocha87@gmail.com','1884','Bocha','6.jpg'),(11,'devfranco87@gmail.com','1884','Probando',NULL),(14,'kira87@gmail.com','1884','Kira87',NULL),(15,'radio@gmail.com','1884','CasaRadio',NULL),(16,'lafiera@gmail.com','1884','maxi',NULL),(17,'ns32@gmail.com','1884','Nacho 32',NULL);
/*!40000 ALTER TABLE `autores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicaciones`
--

DROP TABLE IF EXISTS `publicaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publicaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `resumen` varchar(255) NOT NULL,
  `contenido` varchar(255) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `votos` int(11) DEFAULT 0,
  `fecha_hora` timestamp NULL DEFAULT NULL,
  `autor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_publicaciones_autores_idx` (`autor_id`),
  CONSTRAINT `fk_publicaciones_autores` FOREIGN KEY (`autor_id`) REFERENCES `autores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicaciones`
--

LOCK TABLES `publicaciones` WRITE;
/*!40000 ALTER TABLE `publicaciones` DISABLE KEYS */;
INSERT INTO `publicaciones` VALUES (1,'Roma','Buen viaje a Roma','Contenido Roma',NULL,0,'2020-08-12 02:54:32',1),(2,'Grecia','Buen viaje a Grecia','Contenido Grecia',NULL,0,'2020-07-20 03:22:35',1),(3,'Paris','Buen viaje a Paris','Contenido Paris',NULL,0,'2020-08-07 00:06:01',1),(4,'Costa Rica','Buen viaje a Costa Rica','Contenido Costa Rica',NULL,0,'2020-08-04 03:05:26',2),(5,'Mar del Plata','Buen viaje a Mar del Plata','Contenido Mar del Plata',NULL,0,'2020-08-07 03:11:12',2),(6,'Guadalajara','Buen viaje a Guadalajara','Contenido Guadalajara',NULL,0,'2020-07-29 03:14:54',2),(7,'China','Buen viaje a China','Contenido China',NULL,0,'2020-07-02 03:04:37',2),(8,'Rosario','Rosario, Santa Fe, Argentina - Cuna de la Bandera ..','<p>Ciduad Leprosa!</p>',NULL,0,'2020-08-13 03:00:00',2),(9,'Newell´s Old Boys','La Lepra. Ñubel.','<p>VAMOOOO ÑUUUUBEL ..</p>',NULL,0,'2020-08-17 03:00:00',4),(11,'Banco Credicoop','La Banca Solidaria','<p>&nbsp;</p>',NULL,0,'2020-08-17 03:00:00',5),(12,'Banco Credicoop','La Banca Solidaria','<p>&nbsp;</p>',NULL,0,'2020-08-17 03:00:00',5),(14,'fddfdfdf','hyyhyh','<p>e</p>',NULL,1,'2020-08-17 03:00:00',2),(22,'curl','funciona?','SI o no?',NULL,0,'0000-00-00 00:00:00',1),(23,'curl','funciona?','SI o no?',NULL,0,'0000-00-00 00:00:00',1);
/*!40000 ALTER TABLE `publicaciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-03 22:30:06
