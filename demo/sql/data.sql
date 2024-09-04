USE sample_db;

INSERT INTO `user` (`id`, `email`, `password`, `name`, `icon`) VALUES
  (1, 'robin@example.com', 'password', 'Robin', '/upload/1.png'),
  (2, 'taylor@example.com', 'password', 'Taylor', '/upload/2.png');

INSERT INTO `profile` (`userId`, `address`, `tel`) VALUES
  (1, '777 Brockton Avenue, Abington MA 2351', '202-555-0105'),
  (2, '30 Memorial Drive, Avon MA 2322', '');

INSERT INTO `comment` (`userId`, `text`) VALUES
  (1, 'From Robin #1'),
  (1, 'From Robin #2'),
  (2, 'From Taylor #1');

INSERT INTO `book` (`userId`, `title`) VALUES
  (1, 'Beautiful'),
  (1, 'Lose Yourself'),
  (2, 'When Im Gone');