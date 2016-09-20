'use strict';

import Shell from './shell';
import Logger from './logger';
import Composition from './composition';
import Config from './config';

const Vapor = ((shell, logger, config) => {

    let _vapor;
    let _proc;
    let _shell;
    let _logger;
    let _commands;

    class Vapor {

        constructor(shell, logger, config) {

            this.config = config || Config;

            _shell = shell || new Shell();
            _logger = logger || new Logger();
            _commands = this.config.commands;
            _vapor = this;
        }

        build(callback) {

            _logger.info('Building Vapor');

            _shell.exec(_commands.build, (error, stdout, stderr) => {
                if (error) {
                  _logger.info(stdout) && _logger.error(stderr);
                }

                callback(error);
            });

            return this;
        }

        start(callback) {

            if (_isRunning()) {
                callback(`Vapor is already running on pid ${_proc.pid}`);
                return this;
            }

            _logger.info('Starting Vapor');

            _proc = _shell.spawn(_commands.start, (proc) => {
              proc.on('error', _logger.error);
              proc.stdout.on('data', _logger.info);
              proc.stderr.on('data', _logger.error);
            });

            callback();

            return this;
        }

        stop(callback) {

            _logger.info('Stopping Vapor');

            if (_proc) {
              _proc.kill();
            }

            callback();

            return this;
        }

        reload(callback) {

            const steps = [_vapor.build, _vapor.stop, _wait, _vapor.start, callback];

            const reload = Composition(steps)
                .withFallback(callback)
                .compose();

            reload();

            return this;
        }
    }

    function _wait(callback) {
        setTimeout(callback, 100);
    }

    function _isRunning() {
        return _proc && !_proc.killed
    }

    return new Vapor(shell, logger, config);

});

export default Vapor;
