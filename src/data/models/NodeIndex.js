import DataType from 'sequelize';
import Model from '../sequelize';

const NodeIndex = Model.define('NodeIndex', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: {isInt: true, min: 0}
  },
  nodeIndex: {
    type: DataType.INTEGER
  }
});

export default NodeIndex;
