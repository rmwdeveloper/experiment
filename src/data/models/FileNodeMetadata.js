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
  value: {
    type: DataType.STRING
  }
});

export default FileNode;
