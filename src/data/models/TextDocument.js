import DataType from 'sequelize';
import Model from '../sequelize';

const TextDocument = Model.define('TextDocument', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    validate: {isInt: true, notNull: true, min: 1}
  },
  markup: {
    type: DataType.TEXT,
  },
});

export default TextDocument;
