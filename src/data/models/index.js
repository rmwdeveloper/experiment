import sequelize from '../sequelize';
import User from './User';
import UserLogin from './UserLogin';
import UserProfile from './UserProfile';
import FileSystem from './FileSystem';
import FileNode from './FileNode';
import FileNodeMetadata from './FileNodeMetadata';
import NodeIndex from './NodeIndex';
import IndexIndicatorGroup from './IndexIndicatorGroup';
import Upload from './Upload';

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

FileSystem.belongsTo(User);
FileSystem.hasMany(IndexIndicatorGroup);
FileSystem.hasMany(FileNode);

// FileNode.hasMany(NodeIndex, {as: 'children'} );


FileNode.hasMany(FileNodeMetadata);




User.hasMany(Upload, {
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, UserLogin, UserProfile, FileSystem, Upload, IndexIndicatorGroup,
        // NodeIndex,
        FileNode, FileNodeMetadata};
