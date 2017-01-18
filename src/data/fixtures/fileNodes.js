const fileSystem = require('../fileSystem');

module.exports = Object.keys(fileSystem).map( key => {
  const {name, permissions, extension} = fileSystem[key];
  const fixture = {
    model: 'FileNode',
    data: {
      name, permissions
    }
  };
  if (extension) {
    fixture.data.extension = extension;
  }
  return fixture;
});
