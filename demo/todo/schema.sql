-- Database creation
CREATE DATABASE IF NOT EXISTS todo_demo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE todo_demo;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Todos table
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  completed TINYINT(1) DEFAULT 0,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_userId (userId),
  INDEX idx_completed (completed)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data (password is plain text 'password' for demo purposes only)
INSERT INTO users (username, password) VALUES
('admin', 'password'),
('demo', 'password');

INSERT INTO todos (userId, title, completed) VALUES
(1, 'Read express-sweet documentation', 1),
(1, 'Create TODO application', 1),
(1, 'Style with Bootstrap', 0),
(1, 'Prepare for deployment', 0),
(2, 'Login with demo account', 0),
(2, 'Add a new TODO', 0),
(2, 'Mark TODO as completed', 0);
