const userFixture = require('./user');
const fileSystemFixture = require('./fileSystem');
const fileNodesFixture = require('./fileNodes');
const fileNodeMetadataFixture = require('./fileNodeMetadata');
const textDocumentsFixture = require('./textDocuments');
const metadata = fileNodeMetadataFixture.map( metadataFixture => { // todo: refactor this mess.
  const { model,  data: {name, FileNodeId, value}} = metadataFixture;
  return {model, data: { name, FileNodeId, value}};
});

module.exports = [].concat(userFixture, fileSystemFixture,
            fileNodesFixture, metadata, textDocumentsFixture);
