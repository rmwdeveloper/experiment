import sequelize from '../sequelize';
import User from './User';
import UserLogin from './UserLogin';
import UserProfile from './UserProfile';
import FileSystem from './FileSystem';
import FileNode from './FileNode';
import FileNodeMetadata from './FileNodeMetadata';
import Upload from './Upload';

import { fileSystem, fileNodesFixture, fileNodesMetadataFixture } from  '../fixtures';
User.hasMany(UserLogin, {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});


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


FileSystem.hasMany(FileNode);
FileNode.hasMany(FileNodeMetadata);

// todo: Move these hooks somewhere.


User.hasMany(Upload, {
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, UserLogin, UserProfile, FileSystem, Upload, FileNode, FileNodeMetadata};
