import DataType from 'sequelize';
import Model from '../sequelize';

const FileSystem = Model.define('FileSystem', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    validate: {isInt: true, notNull: true, min: 1}
  },

  fileSystem: {
    type: DataType.TEXT,
  },

  diskSpace: {
    type: DataType.INTEGER,
    default: 50
  }

});

export default FileSystem;
