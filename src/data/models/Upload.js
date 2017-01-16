import DataType from 'sequelize';
import Model from '../sequelize';

const Upload = Model.define('Upload', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    validate: {isInt: true, notNull: true, min: 1}
  },
  location: {
    type: DataType.STRING
  },
  extension: {
    type: DataType.STRING
  },
  fileSize: {
    type: DataType.BIGINT
  },
  uploadDate: {
    type: DataType.DATE,
    defaultValue: DataType.NOW
  },
  uploadComplete: {
    type: DataType.BOOLEAN,
    defaultValue: false
  }
});

export default Upload;
