/**
 * @example
 * node modelTesting.js
 */
const sweet = require('../dist/build.common');
const BookModel = require('./models/BookModel');

// Load Model.
sweet.database.loadModels();

(async () => {
  // SELECT upper(`title`) AS `title` FROM `book` AS `book`;
  // Output:  [
  //            {title: 'MOBY DICK'},
  //            {title: 'GET RICH REALLY FAST'},
  //            {title: 'FINDING INNER PEACE'}
  //          ]
  let books = await BookModel.findAll({
    attributes: [
      [BookModel.fn('upper', BookModel.col('title')), 'title']
    ],
    raw: true
  });
  console.log('All book titles: ', books);

  // SELECT `id`, `title`, (SELECT COUNT(*) FROM comment WHERE comment.bookId = book.id) AS `count` FROM `book` AS `book`;
  // Output:  [
  //            {id: 1, title: 'When Im Gone', count: 2},
  //            {id: 2, title: 'Lose Yourself', count: 1}
  //          ]
  books = await BookModel.findAll({
    attributes: [
      'id',
      'title',
      [BookModel.literal(`(SELECT COUNT(*) FROM comment WHERE comment.bookId = book.id)`), 'count']
    ],
    raw: true
  });
  console.log('Comment count for each book: ', books);


  // SQL: SELECT `title` FROM `book` AS `book` WHERE CHAR_LENGTH(`title`) <= 10;
  // Output: [{title: 'When Im Gone'}]
  books = await BookModel.findAll({
    attributes: ['title'],
    where: BookModel.where(
      BookModel.fn('CHAR_LENGTH', BookModel.col('title')),
      {[BookModel.Op.lte]: 10}
    ),
    raw: true
  });
  console.log('Short book title:', books);

  // Output:  [
  //            {title: 'When Im Gone'},
  //            {title: 'Lose Yourself'}
  //          ]
  books = await BookModel.query("SELECT title FROM book", {type: BookModel.QueryTypes.SELECT});
  console.log('Raw query: ', books);

  // Transaction.
  let transaction;
  try {
    transaction = await BookModel.begin({
      isolationLevel: BookModel.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
      type: BookModel.Transaction.TYPES.DEFERRED,
    });
    const book = await BookModel.findOne({where: {id: 1}}, {transaction});
    book.title = 'When Im Gone';
    await book.save({transaction});
    await transaction.commit();

    // Check the update result. Output: New title of book: When Im Gone
    await book.reload();
    console.log(`New title of book: ${book.title}`);
  } catch (err) {
    if (transaction)
      await transaction.rollback();
  }

  process.exit(0);
})();