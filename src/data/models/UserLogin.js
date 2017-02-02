import DataType from 'sequelize';
import Model from '../sequelize';

const UserLogin = Model.define('UserLogin', {
  id: {
    type: DataType.INTEGER,
    defaultValue: 1,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataType.STRING(50)
  },
  password: {
    type: DataType.STRING,
    notNull: true,
  }
});

export default UserLogin;
