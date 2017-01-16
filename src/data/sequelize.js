import Sequelize from 'sequelize';
import { database_name, database_username, database_password,
database_host, database_dialect} from '../config';

const sequelizeConfig = {
  host: database_host,
  dialect: database_dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false
};
if (database_dialect === 'sqlite') {
  sequelizeConfig.storage = './portfolio';
}

const sequelize = new Sequelize(database_name, database_username, database_password, sequelizeConfig);


sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
export default sequelize;
