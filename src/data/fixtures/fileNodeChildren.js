const fileSystem = require('../fileSystem');

const fixtures = [];

for (const index in fileSystem) {
  if (fileSystem.hasOwnProperty(index)) {
    const node = fileSystem[index];
    if (node.hasOwnProperty('children')) {
      node.children.forEach( child => {
        fixtures.push({
          model: "NodeIndex", data: {nodeIndex: child, FileNodeId: index }
        });
      });
    }
  }
}

module.exports = fixtures;
