import DataType from 'sequelize';
import Model from '../sequelize';

const FileNode = Model.define('FileNode', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: {isInt: true, min: 0}
  },
  name: {
    type: DataType.STRING
  },
  permissions: {
    type: DataType.STRING(4)
  },
  extension: {
    type: DataType.STRING
  }
});

export default FileNode;
