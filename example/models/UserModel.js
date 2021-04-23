const Model = require('express-sweet').database.Model;

/**
 * User model.
 */
module.exports = (class extends Model {
  /**
   * Table name used by the model.
   */
  static get table() {
    return 'user';
  }

  /**
   * Table column list.
   */
  static get attributes() {
    return {
      id: {
        type: Model.types.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: Model.types.STRING,
      password: Model.types.STRING,
      name: Model.types.STRING,
      created: Model.types.DATE,
      modified: Model.types.DATE
    };
  }
}).mount();