-- MySQL dump 10.14  Distrib 5.5.68-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: namelessProject
-- ------------------------------------------------------
-- Server version       5.5.68-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `post` int(11) DEFAULT NULL,
  `creator` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post` (`post`),
  KEY `creator` (`creator`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`creator`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'agreed','2020-12-11 04:51:42',6,2),(2,'nice\\nnice','2020-12-11 11:46:36',7,5),(3,'Found comment field finally','2020-12-11 11:46:47',7,5),(5,'beautiful','2020-12-11 11:49:14',9,6),(6,'on se hiano','2020-12-11 11:49:17',9,6),(7,'nams','2020-12-11 11:50:02',9,6),(9,'asasasfa','2020-12-13 15:25:40',15,1),(10,'Nice!','2020-12-13 18:00:59',5,1);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postId` int(11) DEFAULT NULL,
  `sourceFile` text,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  CONSTRAINT `files_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (5,5,'uploads/files/images/IMG_2665.JPG'),(6,6,'uploads/files/images/pizza.png'),(7,7,'uploads/files/images/pepe.png'),(9,9,'uploads/files/images/tky.jpg'),(10,10,'uploads/files/images/d543a6c5b0ddd023c4cf4797c13d79c9c67f75ad_full.jpg'),(11,11,'uploads/files/images/food_image_1.jpg'),(12,14,'uploads/files/images/henry-co-tqu0IOMaiU8-unsplash.jpg'),(13,15,'uploads/files/images/michael-faes-Ao2tC6HT_Lc-unsplash.jpg'),(15,20,'uploads/files/images/pawel-czerwinski-8uZPynIu-rQ-unsplash.jpg');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foodTypes`
--

DROP TABLE IF EXISTS `foodTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `foodTypes` (
  `foodTypeId` int(11) NOT NULL,
  `foodType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`foodTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foodTypes`
--

LOCK TABLES `foodTypes` WRITE;
/*!40000 ALTER TABLE `foodTypes` DISABLE KEYS */;
INSERT INTO `foodTypes` VALUES (1,'American'),(2,'British'),(3,'Chinese'),(4,'Finnish'),(5,'French'),(6,'German'),(7,'Greek'),(8,'Indian'),(9,'Italian'),(10,'Japanese'),(11,'Korean'),(12,'Mexican'),(13,'Nepalese'),(14,'Russian'),(15,'Spanish'),(16,'Thai'),(17,'Turkish'),(18,'Vietnamese');
/*!40000 ALTER TABLE `foodTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `restaurant` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `views` int(11) DEFAULT '0',
  `votes` int(11) DEFAULT '0',
  `creator` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `foodType` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creator` (`creator`),
  KEY `foodType` (`foodType`),
  CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`foodType`) REFERENCES `foodTypes` (`foodTypeId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (5,'Charlotte','Nice brunch place in Warsaw :)',85,0,1,'2020-12-11 04:38:26',NULL),(6,'Jarbas','delicious, maybe, yes',104,0,2,'2020-12-11 04:51:28',NULL),(7,'Sad pepe','very\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nsad \r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n        \r\n\r\n\r\n\r\n\r\n\r\npepe',17,0,5,'2020-12-11 11:45:35',NULL),(9,'Teron purilaiset','Vidun hyviä einespurilaisia',18,0,6,'2020-12-11 11:48:51',NULL),(10,'sadge','',12,0,7,'2020-12-11 11:49:24',NULL),(11,'SteakStop','A tasty steak!',11,0,9,'2020-12-11 15:35:43',NULL),(14,'xx','xxx,,,.mmm,,,',15,0,1,'2020-12-12 07:19:22',NULL),(15,'dd','ddsd',21,0,1,'2020-12-12 20:11:04',NULL),(20,'dd','dd',1,0,1,'2020-12-13 17:39:32',NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userTypes`
--

DROP TABLE IF EXISTS `userTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userTypes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userTypes`
--

LOCK TABLES `userTypes` WRITE;
/*!40000 ALTER TABLE `userTypes` DISABLE KEYS */;
INSERT INTO `userTypes` VALUES (1,'normal'),(2,'business'),(3,'admin');
/*!40000 ALTER TABLE `userTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `userType` int(11) DEFAULT '1',
  `avatarUrl` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Test','$2a$10$1lQq.OBcTaG5k78ELGj1Z.N6ak45FK2RBnxXgPLVI3rvqWT2B6BTS','test@test.fi',3,'uploads/avatars/5ed780cfbd574e5550c910fae205e0f4'),(2,'jarbas','$2a$10$qo6wv9d2IwA1CIs0Sk71H.SYZVBnYPuF8o3WlBO0ShGVaiI7AjI42','jarbas@jarbas.com',2,'uploads/avatars/47ba5c26ebfd5b0e36ccc97cbca11b0f'),(3,'admin','admin','admin@admin.fi',3,NULL),(4,'tester','$2a$10$dHMGv/Qsk6GpKybp2wIWUOz2/Mjm5CLv/nV4Le4J8nj6.rurBr4Q.','test@test.com',1,NULL),(5,'pickle','$2a$10$lL4MtJUyky4u28F0jb.OVeZvCSVP3W0xPWzBIonTzsrEFU2PRfguS','rick@pickle.com',2,NULL),(6,'ile','$2a$10$1cOjRX/PcwWlebephKt6OepVz9T.uiXNi4BMlBD11noETprvfKYWC','ilkka@test.fi',1,'uploads/avatars/6e0ffc513ce4a60b03e15ebb698012a1'),(7,'Testing','$2a$10$FOxyQEh8jWPQNGH4QfDD3OmrRagfA8maVr6TksmJCFh512Bb4qILq','testertt@gmail.com',2,NULL),(8,'Min','$2a$10$DecEnO8oAr93J15zN8yS.e9W8tNmGwwuzDXJxCSXBL.fIUPKVxPhC','hi@hello.com',2,NULL),(9,'tbtester','$2a$10$yreguA1//D2l7mx728F/BOb51ick8SCQN6YgNLrt22ipfiYWVoTra','tbtester@metropolia.fi',1,NULL),(10,'Mindd','$2a$10$iWXlI1WjW5.WWyaR5hPooO9r/0Ysp2IMsBXz5gkwJi6iGWSYciolW','min@test.fi',1,'uploads/avatars/1ebc5fb4ddd130dd7e0f1cbd2e9fdefc');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;