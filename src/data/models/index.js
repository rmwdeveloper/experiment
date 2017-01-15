import sequelize from '../sequelize';
import User from './User';
import UserLogin from './UserLogin';
import UserProfile from './UserProfile';
import FileSystem from './FileSystem';

User.hasMany(UserLogin, {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});


User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasOne(FileSystem);

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, UserLogin, UserProfile };
