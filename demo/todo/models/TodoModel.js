import * as expx from 'express-sweet';
import UserModel from './UserModel.js';

export default class extends expx.database.Model {
  static get table() {
    return 'todos';
  }

  static get attributes() {
    return {
      id: {
        type: super.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: super.DataTypes.INTEGER,
      title: super.DataTypes.STRING,
      completed: super.DataTypes.BOOLEAN,
      created: super.DataTypes.DATE,
      updated: super.DataTypes.DATE
    };
  }

  /**
   * @see https://sequelize.org/master/manual/assocs.html
   */
  static association() {
    // Todo belongs to User
    super.belongsTo(UserModel, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'user'
    });
  }
}
