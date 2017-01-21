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


User.afterCreate( (instance) => {
  sequelize.transaction( transaction => {
    const { id } = instance.get({plain: true});
     return FileSystem.create({diskSpace: 50, UserId: id }, {transaction}).then(fileSystemInstance => {
       const fileNodes = fileNodesFixture.map( fileNode => { fileNode.FileSystemId = fileSystemInstance.get({plain:true}).id; return fileNode});
       return FileNode.bulkCreate(fileNodes, {transaction, individualHooks: true}).then(fileNodes => {
         const promises = [];
         const fileNodesRows = fileNodes.map( rowData => { return rowData.get({plain: true})});
         for (let iterator = 0; iterator < fileNodesMetadataFixture.length; iterator++) {
           const nodeThatHasMetadata = fileNodesRows.find(element => {
              return fileNodesMetadataFixture[iterator].nodeIndex === element.nodeIndex;
           });
           fileNodesMetadataFixture[iterator].FileNodeId = nodeThatHasMetadata.id;
           const { name, value, FileNodeId } = fileNodesMetadataFixture[iterator];
           const newPromise = FileNodeMetadata.create({ name, value, FileNodeId }, {transaction});
           promises.push(newPromise);
         }
         return Promise.all(promises).then( (results) => {
          return results;
        });
       });
     });

  }).then(result => {
    console.log('result', result);

  }).catch(error => {


  });
  return null;
});



User.hasMany(Upload, {
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, UserLogin, UserProfile, FileSystem, Upload, FileNode, FileNodeMetadata};
