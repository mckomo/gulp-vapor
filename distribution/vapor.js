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

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vapor = function Vapor(shell, logger, config) {

    var _vapor = void 0;
    var _proc = void 0;
    var _shell = void 0;
    var _logger = void 0;
    var _commands = void 0;

    var Vapor = function () {
        function Vapor(shell, logger, config) {
            _classCallCheck(this, Vapor);

            this.config = config || _config2.default;

            _shell = shell || new _shell3.default();
            _logger = logger || new _logger3.default();
            _commands = this.config.commands;
            _vapor = this;
        }

        _createClass(Vapor, [{
            key: 'build',
            value: function build(callback) {

                _logger.info('Building Vapor');

                _shell.exec(_commands.build, function (error, stdout, stderr) {
                    if (error) {
                        _logger.info(stdout) && _logger.error(stderr);
                    }

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

                var program = _commands.start[0];
                var args = _commands.start[1];
                var options = { stdio: 'inherit' };

                _proc = _shell.spawn(program, args, options, function (proc) {
                    proc.on('error', _logger.error);
                });

                callback();

                return this;
            }
        }, {
            key: 'stop',
            value: function stop(callback) {

                _logger.info('Stopping Vapor');

                if (_proc) {
                    _proc.kill();
                }

                callback();

                return this;
            }
        }, {
            key: 'reload',
            value: function reload(callback) {

                var steps = [_vapor.build, _vapor.stop, _wait, _vapor.start, callback];

                var reload = (0, _composition2.default)(steps).withFallback(callback).compose();

                reload();

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

    return new Vapor(shell, logger, config);
};

exports.default = Vapor;