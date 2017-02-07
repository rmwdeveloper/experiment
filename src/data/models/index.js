import sequelize from '../sequelize';
import { deleteFiles } from '../../core/aws';

import User from './User';
import UserLogin from './UserLogin';
import UserProfile from './UserProfile';
import FileSystem from './FileSystem';
import FileNode from './FileNode';
import FileNodeMetadata from './FileNodeMetadata';
import Upload from './Upload';
import TextDocument from './TextDocument';

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

User.hasOne(FileSystem, { onUpdate: 'cascade', onDelete: 'cascade' });


FileSystem.hasMany(FileNode, { onUpdate: 'cascade', onDelete: 'cascade' });

FileNode.hasMany(FileNode, { onUpdate: 'cascade', onDelete: 'cascade' });

FileNode.hasMany(FileNodeMetadata, { onUpdate: 'cascade', onDelete: 'cascade' });

FileNode.hasOne(Upload, {onDelete: 'cascade', hooks: true});

Upload.belongsTo(FileNode, { hooks: true });
TextDocument.belongsTo(FileNode);

User.hasMany(Upload, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
  hooks: true
});


Upload.hook('afterDestroy', deleteFiles);

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, UserLogin, UserProfile, FileSystem, Upload, FileNode, FileNodeMetadata, TextDocument};
