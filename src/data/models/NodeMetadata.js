import DataType from 'sequelize';
import Model from '../sequelize';

const NodeMetadata = Model.define('NodeMetadata', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: {isInt: true, min: 0}
  }
});

export default NodeMetadata;
