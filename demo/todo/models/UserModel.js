import * as expx from 'express-sweet';
import TodoModel from './TodoModel.js';

export default class extends expx.database.Model {
  static get table() {
    return 'users';
  }

  static get attributes() {
    return {
      id: {
        type: super.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: super.DataTypes.STRING,
      password: super.DataTypes.STRING,
      created: super.DataTypes.DATE,
      updated: super.DataTypes.DATE
    };
  }

  /**
   * @see https://sequelize.org/master/manual/assocs.html
   */
  static association() {
    // User has many todos
    super.hasMany(TodoModel, {
      foreignKey: 'userId',
      sourceKey: 'id',
      as: 'todos'
    });
  }
}
