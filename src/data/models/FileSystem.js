import DataType from 'sequelize';
import Model from '../sequelize';
import fileSystem from '../fileSystem';
const FileSystem = Model.define('FileSystem', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: {isInt: true, min: 0}
  },
  fileSystem: {
    type: DataType.TEXT,
    default: JSON.stringify(fileSystem)
  },
  diskSpace: {
    type: DataType.INTEGER,
    default: 50
  }

});

export default FileSystem;
