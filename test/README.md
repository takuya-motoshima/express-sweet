# Test Express Sweet features

## Getting Started

Build a DB to use for model validation.  
This test uses MariaDB, so please install MariaDB in advance.  
The DB settings are in "./config/database.js".

```sql
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8mb4;

USE `test`;

CREATE TABLE `book` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
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
```

Register test data in DB.  

```sql
INSERT INTO `book` (`title`) VALUES
  ('Moby Dick'),
  ('Get Rich Really Fast'),
  ('Finding Inner Peace');

INSERT INTO `comment` (`bookId`, `comment`) VALUES
  (1, 'Interesting.'),
  (1, 'Very excited.'),
  (2, 'Very interesting.');

SELECT `id`, `title` FROM `book`;
-- +----+----------------------+
-- | id | title                |
-- +----+----------------------+
-- |  1 | Moby Dick            |
-- |  2 | Get Rich Really Fast |
-- |  3 | Finding Inner Peace  |
-- +----+----------------------+

SELECT `bookId`, `comment` FROM `comment`;
-- +--------+-------------------+
-- | bookId | comment           |
-- +--------+-------------------+
-- |      1 | Interesting.      |
-- |      1 | Very excited.     |
-- |      2 | Very interesting. |
-- +--------+-------------------+
```

## Usage

Test Face Rekognition.
```sh
NODE_ENV=development node rekognition.js
```

Test to get data from DB.
```sh
NODE_ENV=development node db.js
```