'use strict';

// require('babel-core/register');

import {expect, assert} from 'chai';
import Config from '../scripts/config';

describe('Config', () => {

    it('stores commands', () => {
      expect(Config.commands).be.an('object');
    });

    describe('.commands', () => {

        describe('.start ', () => {

          const _startCommand = Config.commands.start;

          it('is stored as array', () => {
            expect(_startCommand).be.a('array');
          })

          it('holds program path as first element', () => {
            expect(_startCommand[0]).to.eq('.build/debug/gulp-vapor');
          })

          it('holds array of program arguments as second element', () => {
            expect(_startCommand[1]).to.have.members(['serve']);
          })

        });

        describe('.build ', () => {

          const _buildCommand = Config.commands.build;

          it('is stored as string', () => {
            expect(_buildCommand).be.a('string');
          })

          it('holds default swift build command', () => {
            expect(_buildCommand).to.eq('swift build');
          })

        });

    });

    describe('.projectName', () => {

      const _projectName = Config.projectName;

      it('is equal to the project directory name', () => {
        expect(_projectName).to.eq('gulp-vapor')
      });

    });

});
