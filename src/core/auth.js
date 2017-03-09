import { User, FileSystem, FileNode, FileNodeMetadata, TextDocument } from '../data/models';


export function getUser(username) {
  return User.findOne({ where: { username }, attributes: ['username', 'email', 'emailConfirmed', 'id'],
    include: [{ model: FileSystem, attributes: ['diskSpace', 'id'],
    include: [{ model: FileNode, attributes: ['name', 'permissions', 'extension', 'nodeIndex', 'FileNodeId', 'id'],
    include: [{ model: FileNodeMetadata, attributes: ['name', 'value'] }, { model: TextDocument, attributes: ['markup', 'FileNodeId'] }]
    }] }] });
}