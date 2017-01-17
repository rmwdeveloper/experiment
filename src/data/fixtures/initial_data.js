const fileSystem = require('../fileSystem');

module.exports = [
  {
    "model": "User",
    "data": {
      "username": "Guest"
    }
  },
  {
  "model": "FileSystem",
  "data": {
  "UserId": 1,
  "diskSpace": 50,
  "fileSystem": JSON.stringify(fileSystem)
  }
  },
  {
    "model": "IndexIndicatorGroup",
    "data": {
      "FileSystemId": 1,
      "name": "desktopNodeIndex",
      "id": 1
    }
  },
  {
    "model": "IndexIndicatorGroup",
    "data": {
      "FileSystemId": 1,
      "name": "userIndex",
      "id": 2
    }
  },
  {
    "model": "IndexIndicatorGroup",
    "data": {
      "FileSystemId": 1,
      "name": "authenticatorIndex",
      "id": 3
    }
  },
  {
    "model": "IndexIndicatorGroup",
    "data": {
      "FileSystemId": 1,
      "name": "startMenuProgramIndices",
      "id": 4
    }
  },
  {
    "model": "IndexIndicatorGroup",
    "data": {
      "FileSystemId": 1,
      "name": "userDirectoriesIndices",
      "id": 5
    }
  },{
    "model": "IndexIndicatorGroup",
    "data": {
      "FileSystemId": 1,
      "name": "computerSettingsIndices",
      "id": 6
    }
  },
  {
    "model": "IndexIndicatorGroup",
    "data": {
      "FileSystemId": 1,
      "name": "utilityControlsIndices",
      "id": 7
    }
  },
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
];