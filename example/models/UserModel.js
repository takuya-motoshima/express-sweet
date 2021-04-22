const sweet = require('express-sweet');

/**
 * User model.
 */
export default (class extends sweet.database.Model {
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