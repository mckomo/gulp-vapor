'use strict';

import Shell from './shell';
import Logger from './logger';
import Composition from './composition';

const Vapor = ((shell, logger) => {

    const BuildCommand = 'swift build';
    const StartCommand = '.build/debug/App';

    let _vapor;
    let _shell;
    let _logger;
    let _proc;

    class Vapor {

        constructor(shell, logger) {
            _vapor = this;
            _shell = shell || new Shell();
            _logger = logger || new Logger();
        }

        build(callback) {

            _logger.info('Building Vapor');

            _shell.exec(BuildCommand, (error, stdout, stderr) => {
                if (error)
                    _logger.info(stdout) && _logger.error(stderr);

                callback(error);
            });

            return this;
        }

        start(callback) {

            if (_isRunning()) {
                callback(`Vapor is already running on pid ${_proc.pid}`);
                return this;
            }

            _logger.info(`Starting Vapor`);

            _proc = _shell.spawn(StartCommand, (proc) => {
                proc.stdout.on('data', _logger.info);
                proc.stderr.on('data', _logger.error);
            });

            callback();

            return this;
        }

        stop(callback) {

            _logger.info('Stopping Vapor');
            
            if (_proc)
                _proc.kill();

            callback();

            return this;
        }

        reload(callback) {
            let reloadSteps = [_vapor.build, _vapor.stop, _wait, _vapor.start, callback];
            let reloadComposition = Composition(reloadSteps)
                .withFallback(callback)
                .compose();

            reloadComposition();

            return this;
        }
    }

    function _wait(callback) {
        setTimeout(callback, 100);
    }

    function _isRunning() {
        return _proc && !_proc.killed
    }

    return new Vapor(shell, logger);

});

export default Vapor;
