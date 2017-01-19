const fileSystem = require('../fileSystem');

const fixtures = [];
for (const index in fileSystem) {
  if (fileSystem.hasOwnProperty(index)) {
    const node = fileSystem[index];
    if (node.hasOwnProperty('metadata')) {
      for (const metaDataItem in node.metadata) {
        if (node.metadata.hasOwnProperty(metaDataItem)) {
          fixtures.push(
            {model: 'FileNodeMetadata', data: {name: metaDataItem, FileNodeId: index,
              nodeIndex: index,
              value: node.metadata[metaDataItem]}}
          )
        }
      }
    }
  }
}
module.exports = fixtures;