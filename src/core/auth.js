import { User } from '../data/models';


export function getUser(username = null, id = null) {
  
  return User.findOne({ where: { username  }, attributes: ['username', 'email', 'emailConfirmed'],
    include: [{ model: FileSystem, attributes: ['diskSpace'],
    include: [{ model: FileNode, attributes: ['name', 'permissions', 'extension', 'nodeIndex', 'FileNodeId'],
    include: [{ model: FileNodeMetadata, attributes: ['name', 'value'] }]
    }] }] });
}