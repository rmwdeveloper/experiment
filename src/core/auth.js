import { User, FileSystem, FileNode, FileNodeMetadata } from '../data/models';


export function getUser(username) {
  return User.findOne({ where: { username }, attributes: ['username', 'email', 'emailConfirmed', 'id'],
    include: [{ model: FileSystem, attributes: ['diskSpace'],
    include: [{ model: FileNode, attributes: ['name', 'permissions', 'extension', 'nodeIndex', 'FileNodeId'],
    include: [{ model: FileNodeMetadata, attributes: ['name', 'value'] }]
    }] }] });
}