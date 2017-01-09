import DataType from 'sequelize';
import Model from '../sequelize';

const User = Model.define('User', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    validate: {isInt: true, notNull: true, min: 1}
  },
  username: {
    type: DataType.STRING(30),
    unique: true
  },
  password: {
    type: DataType.STRING(128)
  },
  email: {
    type: DataType.STRING(256),
    validate: { isEmail: true },
    unique: true
  },

  emailConfirmed: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },

}, {

  indexes: [
    { fields: ['email'] },
  ],

});

export default User;
