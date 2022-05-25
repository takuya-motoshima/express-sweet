# This is a test project for Express Sweet.

## Getting Started
Create a DB for testing the model.  
MariaDB will be used for this test, so please install MariaDB beforehand. 
The DB configuration is located in ". /config/database.js".

```sql
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8mb4;
USE `test`;

CREATE TABLE `book` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ukBookTitle` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `comment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `bookId` int unsigned NOT NULL,
  `comment` text NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fkCommentUser` (`bookId`),
  CONSTRAINT `fkCommentBook` FOREIGN KEY (`bookId`) REFERENCES `book` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `book` (`id`, `title`) VALUES (1, 'When Im Gone'), (2, 'Lose Yourself');
INSERT INTO `comment` (`bookId`, `comment`) VALUES (1, 'Interesting'), (1, 'Very excited'), (2, 'Very interesting');
```

## Usage
Model testing.
```sh
node modelTesting.js
```

Testing of face detection.
```sh
node detectFaces.js
```

Testing of face collection.
```sh
node findFaceInCollection.js
```