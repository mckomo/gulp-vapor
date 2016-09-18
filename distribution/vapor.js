'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shell2 = require('./shell');

var _shell3 = _interopRequireDefault(_shell2);

var _logger2 = require('./logger');

var _logger3 = _interopRequireDefault(_logger2);

var _composition = require('./composition');

var _composition2 = _interopRequireDefault(_composition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vapor = function Vapor(shell, logger) {

    var ProjectPath = process.cwd();
    var ProjectName = ProjectPath.substr(ProjectPath.lastIndexOf('/') + 1);
    var BuildCommand = 'swift build';
    var StartCommand = '.build/debug/' + ProjectName;

    var _vapor = void 0;
    var _shell = void 0;
    var _logger = void 0;
    var _proc = void 0;

    var Vapor = function () {
        function Vapor(shell, logger) {
            _classCallCheck(this, Vapor);

            _vapor = this;
            _shell = shell || new _shell3.default();
            _logger = logger || new _logger3.default();
        }

        _createClass(Vapor, [{
            key: 'build',
            value: function build(callback) {

                _logger.info('Building Vapor');

                _shell.exec(BuildCommand, function (error, stdout, stderr) {
                    if (error) _logger.info(stdout) && _logger.error(stderr);

                    callback(error);
                });

                return this;
            }
        }, {
            key: 'start',
            value: function start(callback) {

                if (_isRunning()) {
                    callback('Vapor is already running on pid ' + _proc.pid);
                    return this;
                }

                _logger.info('Starting Vapor');

                _proc = _shell.spawn(StartCommand, function (proc) {
                    proc.stdout.on('data', _logger.info);
                    proc.stderr.on('data', _logger.error);
                });

                callback();

                return this;
            }
        }, {
            key: 'stop',
            value: function stop(callback) {

                _logger.info('Stopping Vapor');

                if (_proc) _proc.kill();

                callback();

                return this;
            }
        }, {
            key: 'reload',
            value: function reload(callback) {
                var reloadSteps = [_vapor.build, _vapor.stop, _wait, _vapor.start, callback];
                var reloadComposition = (0, _composition2.default)(reloadSteps).withFallback(callback).compose();

                reloadComposition();

                return this;
            }
        }]);

        return Vapor;
    }();

    function _wait(callback) {
        setTimeout(callback, 100);
    }

    function _isRunning() {
        return _proc && !_proc.killed;
    }

    return new Vapor(shell, logger);
};

exports.default = Vapor;