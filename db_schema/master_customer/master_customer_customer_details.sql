-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: master_customer
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer_details`
--

DROP TABLE IF EXISTS `customer_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_details` (
  `customer_id` int NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_mobile` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_password` varchar(255) NOT NULL,
  `database_id` varchar(255) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_id_UNIQUE` (`customer_id`),
  UNIQUE KEY `customer_mobile_UNIQUE` (`customer_mobile`),
  UNIQUE KEY `customer_email_UNIQUE` (`customer_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_details`
--

LOCK TABLES `customer_details` WRITE;
/*!40000 ALTER TABLE `customer_details` DISABLE KEYS */;
INSERT INTO `customer_details` VALUES (1,'Aman','9835541639','aman@gmai.co.in','U2FsdGVkX1/CpnKtvVEEtwMzQnDd80oK0LZ7qb66Y2U=','child_1'),(2,'Anain','7050876124','anain@gmail.com','U2FsdGVkX1/ou7BAhAMQNfDBfWt4WgbIwP+ydkdz4dU=','child_2'),(3,'Ranjay','9572970863','ranjay@gmail.com','U2FsdGVkX1/krfEGaejw96fEnKVBAE+JvfFAkyy+j88=','child_1'),(4,'Ayyan','8434520968','ayyan@gmail.com','U2FsdGVkX1+STMtH/WBaeEOY9S1t4Fw3ROTgw2HnlnM=','child_2'),(5,'Abhinav','9955663329','abhinav@gmail.co.in','U2FsdGVkX18iwXHGqtBrtzKgPxe20QpmvGHlXHzLzWk=','child_1'),(6,'Faizan','7252829864','faizan@gmail.co.in','U2FsdGVkX1+d5W9Ibj18ANeF1uDEHs9yi+SmZFLIujI=','child_2'),(7,'Aarish','9863546974','aarish@gmail.co.in','U2FsdGVkX18OZU4pOeVjBakay3yHM7sl0suoDJGjJ3Q=','child_1'),(8,'Ritesh','6298415632','ritesh@gmail.co.in','U2FsdGVkX1802rXuosforG0sF2+UnXgMwLSZGerff8Y=','child_2'),(9,'Kunal','7841635297','kunal@gmail.co.in','U2FsdGVkX18w/Ejve76pa9HXX72VjgXiHlUrhHCzlyI=','child_1'),(10,'Sachin','9865341598','sachin@gmail.co.in','U2FsdGVkX1/IQ9RMUPz/pnBzXNBQV4X7361xdjsk1bo=','child_2'),(11,'Raj','7896534565','raj@gmail.co.in','U2FsdGVkX1/KvyFslStDys0D2sRUuYy/xTPsh75IApw=','child_1'),(12,'Aarav','6985234499','aarav@gmail.co.in','U2FsdGVkX1/B0syPyoff9qHUDDToX7Vp6UH+X0E9k/E=','child_2');
/*!40000 ALTER TABLE `customer_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-11 12:55:10
