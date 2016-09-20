'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findProjectName = findProjectName;
exports.directoryName = directoryName;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findProjectName() {

  var rootPath = process.cwd();
  var sourcesPath = _path2.default.join(rootPath, 'Sources');

  // STRATEGY 1: Check if there is main source directory
  var sourceDirs = _fs2.default.readdirSync(sourcesPath).map(function (file) {
    return _path2.default.join(sourcesPath, file);
  }).filter(function (path) {
    return _fs2.default.statSync(path).isDirectory();
  });

  if (sourceDirs.length == 1) {
    return directoryName(sourceDirs[0]);
  }

  // STRATEGY 2: Get project root directory name
  return directoryName(rootPath);
}

function directoryName(dirPath) {
  return dirPath.split(_path2.default.sep).pop();
}