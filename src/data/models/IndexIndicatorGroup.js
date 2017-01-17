import DataType from 'sequelize';
import Model from '../sequelize';

const IndexIndicatorGroup = Model.define('IndexIndicatorGroup', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: {isInt: true, min: 0}
  },
  name: {
    type: DataType.STRING
  }
});

export default IndexIndicatorGroup;
