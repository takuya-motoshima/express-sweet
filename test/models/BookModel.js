import * as sweet from 'express-sweet';

/**
 * Book model.
 */
export default class extends sweet.database.Model {
  /**
   * The name of the table that the model accesses.
   */
  static get table() {
    return 'book';
  }

  /**
   * List of columns in the table accessed by this model.
   */  
  static get attributes() {
    return {
      id: {
        type: this.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: this.DataTypes.STRING,
      created: this.DataTypes.DATE,
      modified: this.DataTypes.DATE
    };
  }

  /**
   * Use sequelize.fn and sequelize.col to get the Book title in uppercase.
   */
  static async getBookTitlesInUppercase() {
    // SQL: SELECT upper(`title`) AS `title` FROM `book` AS `book`;
    // Output: books= [
    //           { title: 'MOBY DICK' },
    //           { title: 'GET RICH REALLY FAST' },
    //           { title: 'FINDING INNER PEACE' }
    //         ]
    const books = await this.findAll({
      attributes: [
        [this.fn('upper', this.col('title')), 'title']
      ],
      raw: true
    });
    console.log('books=', books);
    return books;
  }

  /**
   * Get the number of comments for each Book using subquery by sequelize.literal.
   */
  static async getBookCommentsCount() {
    // SQL: SELECT
    //        `id`,
    //        `title`,
    //        (SELECT COUNT(*) FROM comment WHERE comment.bookId = book.id) AS `count`
    //      FROM
    //        `book` AS `book`;
    // Output: books= [
    //           { id: 1, title: 'Moby Dick', count: 2 },
    //           { id: 2, title: 'Get Rich Really Fast', count: 1 },
    //           { id: 3, title: 'Finding Inner Peace', count: 0 }
    //         ]
    const books = await this.findAll({
      attributes: [
        'id',
        'title',
        [this.literal(`(SELECT COUNT(*) FROM comment WHERE comment.bookId = book.id)`), 'count']
      ],
      raw: true
    });
    console.log('books=', books);
    return books;
  }
}