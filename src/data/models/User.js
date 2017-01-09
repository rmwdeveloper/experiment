import DataType from 'sequelize';
import Model from '../sequelize';

const User = Model.define('User', {
  id: {
    type: DataType.INTEGER,
    defaultValue: 1,
    primaryKey: true,
    autoIncrement: true
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
