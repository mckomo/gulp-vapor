import { findProjectName } from './utils'

const projectName = findProjectName();

const Config = {
  projectName: projectName,
  commands: {
    build: 'swift build',
    start: [`.build/debug/${projectName}`, ['serve']]
  }
};

export default Config;
