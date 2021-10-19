const sweet = require('../../dist/build.common');

/**
 * Book model.
 */
module.exports = class extends sweet.database.Model {
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
    // SELECT upper(`title`) AS `title` FROM `book` AS `book`;
    const books = await this.findAll({
      attributes: [
        [this.fn('upper', this.col('title')), 'title']
      ],
      raw: true
    });

    // Output: books= [
    //           { title: 'MOBY DICK' },
    //           { title: 'GET RICH REALLY FAST' },
    //           { title: 'FINDING INNER PEACE' }
    //         ]
    console.log('books=', books);
    return books;
  }

  /**
   * Get the number of comments for each Book using subquery by sequelize.literal.
   */
  static async getBookCommentsCount() {
    // SELECT
    //   `id`,
    //   `title`,
    //   (SELECT COUNT(*) FROM comment WHERE comment.bookId = book.id) AS `count`
    // FROM
    //   `book` AS `book`;
    const books = await this.findAll({
      attributes: [
        'id',
        'title',
        [this.literal(`(SELECT COUNT(*) FROM comment WHERE comment.bookId = book.id)`), 'count']
      ],
      raw: true
    });

    // Output: books= [
    //           { id: 1, title: 'Moby Dick', count: 2 },
    //           { id: 2, title: 'Get Rich Really Fast', count: 1 },
    //           { id: 3, title: 'Finding Inner Peace', count: 0 }
    //         ]
    console.log('books=', books);
    return books;
  }

  /**
   * Use sequelize.where to get only Books with a title length of 10 characters or less.
   */
  static async getBooksWithShortTitles() {
    // SELECT `title` FROM `book` AS `book` WHERE CHAR_LENGTH(`title`) <= 10;
    const books = await this.findAll({
      attributes: ['title'],
      where: this.where(
        this.fn('CHAR_LENGTH', this.col('title')),
        {[this.Op.lte]: 10}
      ),
      raw: true
    });

    // Output: books= [ { title: 'Moby Dick' } ]
    console.log('books=', books);
    return books;
  }
}