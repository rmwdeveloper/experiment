const userFixture = require('./user');
const fileSystemFixture = require('./fileSystem');
const indexIndicatorGroupsFixture = require('./indexIndicatorGroups');
const nodeIndicesFixture = require('./nodeIndices');
const fileNodeChildrenFixture = require('./fileNodeChildren');
const fileNodesFixture = require('./fileNodes');
const fileNodeMetadataFixture = require('./fileNodeMetadata');

module.exports = [].concat(userFixture, fileSystemFixture, indexIndicatorGroupsFixture,
            fileNodesFixture, fileNodeMetadataFixture, nodeIndicesFixture, fileNodeChildrenFixture);
