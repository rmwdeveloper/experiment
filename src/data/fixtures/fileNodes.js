const fileSystem = require('../fileSystem');

const parentDirectory = {};
Object.keys(fileSystem).forEach( key => {
  if (fileSystem[key].hasOwnProperty('children')) {
    fileSystem[key].children.forEach(child => {
      parentDirectory[child] = parseInt(key, 10);
    });
  }
});

module.exports = Object.keys(fileSystem).map( key => {
  const {name, permissions, extension} = fileSystem[key];
  const fixture = {
    model: 'FileNode',
    data: {
      name, permissions, FileSystemId: 1, nodeIndex: parseInt(key, 10)
    }
  };
  if (extension) {
    fixture.data.extension = extension;
  }
  if (parentDirectory.hasOwnProperty(key)) {
    fixture.data.FileNodeId = parentDirectory[key];
  }
  return fixture;
});
