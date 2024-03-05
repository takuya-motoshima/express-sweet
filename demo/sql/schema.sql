CREATE DATABASE IF NOT EXISTS `express_sweet_db` DEFAULT CHARACTER SET utf8mb4;

USE `express_sweet_db`;

CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `icon` varchar(768) NOT NULL DEFAULT MD5(RAND()),
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ukUserEmail` (`email`),
  UNIQUE KEY `ukUserIcon`(`icon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `profile` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned NOT NULL,
  `address` varchar(255) NOT NULL,
  `tel` varchar(14) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ukProfileUserId` (`userId`),
  CONSTRAINT `fkProfileUser` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `comment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned NOT NULL,
  `text` text NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fkCommentUser` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `book` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned NOT NULL,
  `title` text NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ukBookTitle` (`userId`, `title`(255)),
  CONSTRAINT `fkBookUser` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;