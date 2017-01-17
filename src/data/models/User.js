import DataType from 'sequelize';
import Model from '../sequelize';

const User = Model.define('User', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: {isInt: true, min: 0}
  },
  username: {
    type: DataType.STRING(30),
    unique: true,
    validate: {
      len: {
        args: [5, 30],
        msg: 'Username must be between 5 and 30 characters'
      },
      is: {
        args: /^[\w.@+-]+$/i,
        msg: 'Enter a valid username. This value may contain only letters, ' +
        'numbers, and  @/./+/-/_ characters.'
      }
    }
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
