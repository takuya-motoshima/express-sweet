const sweet = require('../dist/build.common');
const BookModel = require('./models/BookModel');

(async () => {
  // Load and initialize all models.
  sweet.database.loadModels();

  // Use sequelize.fn and sequelize.col to get the Book title in uppercase.
  await BookModel.getBookTitlesInUppercase();

  // Get the number of comments for each Book using subquery by sequelize.literal.
  await BookModel.getBookCommentsCount();

  // Use sequelize.where to get only Books with a title length of 10 characters or less.
  await BookModel.getBooksWithShortTitles();
})();