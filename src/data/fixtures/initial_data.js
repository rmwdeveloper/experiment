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
      "name": "desktopNodeIndex"
    }
  },
  {
    "model": "IndexIndicatorGroup",
    "data": {
      "name": "userIndex"
    }
  },
  {
    "model": "IndexIndicatorGroup",
    "data": {
      "name": "authenticatorIndex"
    }
  },
  {
    "model": "IndexIndicatorGroup",
    "data": {
      "name": "startMenuProgramIndices"
    }
  },
  {
    "model": "IndexIndicatorGroup",
    "data": {
      "name": "userDirectoriesIndices"
    }
  },{
    "model": "IndexIndicatorGroup",
    "data": {
      "name": "computerSettingsIndices"
    }
  },
  {
    "model": "IndexIndicatorGroup",
    "data": {
      "name": "utilityControlsIndices"
    }
  },
];