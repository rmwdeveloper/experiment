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

module.exports = fixtures.concat([
  {
    "model": "NodeIndex",
    "data": {
      "IndexIndicatorGroupId": 1,
      "nodeIndex": 11
    }
  },
  {
    "model": "NodeIndex",
    "data": {
      "IndexIndicatorGroupId": 2,
      "nodeIndex": 4
    }
  },
  {
    "model": "NodeIndex",
    "data": {
      "IndexIndicatorGroupId": 3,
      "nodeIndex": 29
    }
  },
  {
    "model": "NodeIndex",
    "data": {
      "IndexIndicatorGroupId": 4,
      "nodeIndex": 5
    }
  },
  {
    "model": "NodeIndex",
    "data": {
      "IndexIndicatorGroupId": 4,
      "nodeIndex": 6
    }
  },
  {
    "model": "NodeIndex",
    "data": {
      "IndexIndicatorGroupId": 4,
      "nodeIndex": 7
    }
  },
  {
    "model": "NodeIndex",
    "data": {
      "IndexIndicatorGroupId": 5,
      "nodeIndex": 14
    }
  },
  {
    "model": "NodeIndex",
    "data": {
      "IndexIndicatorGroupId": 5,
      "nodeIndex": 15
    }
  },
  {
    "model": "NodeIndex",
    "data": {
      "IndexIndicatorGroupId": 5,
      "nodeIndex": 16
    }
  },
  {
    "model": "NodeIndex",
    "data": {
      "IndexIndicatorGroupId": 6,
      "nodeIndex": 17
    }
  },
  {
    "model": "NodeIndex",
    "data": {
      "IndexIndicatorGroupId": 6,
      "nodeIndex": 18
    }
  },
  {
    "model": "NodeIndex",
    "data": {
      "IndexIndicatorGroupId": 7,
      "nodeIndex": 19
    }
  },
  {
    "model": "NodeIndex",
    "data": {
      "IndexIndicatorGroupId": 7,
      "nodeIndex": 20
    }
  },{
    "model": "NodeIndex",
    "data": {
      "IndexIndicatorGroupId": 7,
      "nodeIndex": 21
    }
  }
]);