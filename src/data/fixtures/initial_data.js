const userFixture = require('./user');
const fileSystemFixture = require('./fileSystem');
const indexIndicatorGroupsFixture = require('./indexIndicatorGroups');
const nodeIndicesFixture = require('./nodeIndices');

module.exports = [].concat(userFixture, fileSystemFixture, indexIndicatorGroupsFixture, nodeIndicesFixture);
