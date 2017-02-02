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
  diskSpace: {
    type: DataType.INTEGER,
    defaultValue: 50
  }

});

export default FileSystem;
