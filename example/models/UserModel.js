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

  /**
   * Returns page data.
   */
  static async paginate(options) {
    // Initialize options.
    options = Object.assign({
      offset: 0,
      limit: 30,
      search: undefined,
      order: undefined,
      dir: undefined
    }, options);
    console.log('options=', options);
    return {
      recordsTotal: 0,
      recordsFiltered: 0,
      data: []
    };
  }
}).mount();