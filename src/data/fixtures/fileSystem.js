const fileSystem = require('../fileSystem');

module.exports = [{
  "model": "FileSystem",
  "data": {
    "UserId": 1,
    "diskSpace": 50,
    "fileSystem": JSON.stringify(fileSystem)
  }
}];