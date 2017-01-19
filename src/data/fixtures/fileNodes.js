const fileSystem = require('../fileSystem');

module.exports = Object.keys(fileSystem).map( key => {
  const {name, permissions, extension} = fileSystem[key];
  const fixture = {
    model: 'FileNode',
    data: {
      name, permissions, FileSystemId: 1, nodeIndex: key
    }
  };
  if (extension) {
    fixture.data.extension = extension;
  }
  return fixture;
});
