const sweet = require('../../dist/build.common');

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
  static async getUppercaseTitle() {
    // SQL: SELECT upper(`title`) AS `title` FROM `book` AS `book`;
    // Output: [
    //           { title: 'MOBY DICK' },
    //           { title: 'GET RICH REALLY FAST' },
    //           { title: 'FINDING INNER PEACE' }
    //         ]
    return this.findAll({
      attributes: [
        [this.fn('upper', this.col('title')), 'title']
      ],
      raw: true
    });
  }

  /**
   * Get the number of comments for each Book using subquery by sequelize.literal.
   */
  static async getCommentsCount() {
    // SQL: SELECT `id`, `title`, (SELECT COUNT(*) FROM comment WHERE comment.bookId = book.id) AS `count` FROM `book` AS `book`;
    // Output: [
    //           { id: 1, title: 'Moby Dick', count: 2 },
    //           { id: 2, title: 'Get Rich Really Fast', count: 1 },
    //           { id: 3, title: 'Finding Inner Peace', count: 0 }
    //         ]
    return this.findAll({
      attributes: [
        'id',
        'title',
        [this.literal(`(SELECT COUNT(*) FROM comment WHERE comment.bookId = book.id)`), 'count']
      ],
      raw: true
    });
  }

  /**
   * Use sequelize.where to get only Books with a title length of 10 characters or less.
   */
  static async getShortTitles() {
    // SQL: SELECT `title` FROM `book` AS `book` WHERE CHAR_LENGTH(`title`) <= 10;
    // Output: [
    //           {
    //             title: 'Moby Dick'
    //           }
    //         ]
    return this.findAll({
      attributes: ['title'],
      where: this.where(
        this.fn('CHAR_LENGTH', this.col('title')),
        {[this.Op.lte]: 10}
      ),
      raw: true
    });
  }
}