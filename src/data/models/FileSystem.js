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
    defaultValue: JSON.stringify(fileSystem),
    allowNull: false
  },
  diskSpace: {
    type: DataType.INTEGER,
    defaultValue: 50
  }

});

export default FileSystem;
