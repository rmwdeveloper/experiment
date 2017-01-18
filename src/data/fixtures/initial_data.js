const userFixture = require('./user');
const fileSystemFixture = require('./fileSystem');
const indexIndicatorGroupsFixture = require('./indexIndicatorGroups');
const nodeIndicesFixture = require('./nodeIndices');
const fileNodesFixture = require('./fileNodes');
const fileNodeMetadataFixture = require('./fileNodeMetadata');

module.exports = [].concat(userFixture, fileSystemFixture, indexIndicatorGroupsFixture, nodeIndicesFixture,
            fileNodesFixture, fileNodeMetadataFixture);
