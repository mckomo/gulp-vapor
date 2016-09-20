'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var projectName = (0, _utils.findProjectName)();

var Config = {
  projectName: projectName,
  commands: {
    build: 'swift build',
    start: ['.build/debug/' + projectName, ['serve']]
  }
};

exports.default = Config;