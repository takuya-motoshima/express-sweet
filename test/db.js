const sweet = require('../dist/build.common');
const BookModel = require('./models/BookModel');

(async () => {
  sweet.database.loadModels();

  console.log('All book titles: ', await BookModel.getUppercaseTitle());
  console.log('Comment count for each book: ', await BookModel.getCommentsCount());
  console.log('Short book title:', await BookModel.getShortTitles());
  console.log('Raw query: ', await BookModel.query("SELECT * FROM book", {type: BookModel.QueryTypes.SELECT}));
})();