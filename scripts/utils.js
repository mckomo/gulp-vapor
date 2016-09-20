import path from 'path';
import fs from 'fs';

export function findProjectName() {

  const rootPath = process.cwd();
  const sourcesPath = path.join(rootPath, 'Sources');

  // STRATEGY 1: Check if there is main source directory
  const sourceDirs = fs
    .readdirSync(sourcesPath)
    .map(file => path.join(sourcesPath, file))
    .filter(path => fs.statSync(path).isDirectory());

  if (sourceDirs.length == 1) {
    return directoryName(sourceDirs[0]);
  }

  // STRATEGY 2: Get project root directory name
  return directoryName(rootPath);
}

export function directoryName(dirPath) {
  return dirPath.split(path.sep).pop()
}
