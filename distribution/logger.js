'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _prefix = require('./prefix');

var _prefix2 = _interopRequireDefault(_prefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function Logger(format) {

    var _format = void 0;

    var Logger = function () {
        function Logger(format) {
            _classCallCheck(this, Logger);

            _format = format || _prefix2.default + ': %s';
        }

        _createClass(Logger, [{
            key: 'info',
            value: function info(message) {
                console.log(_format, message.toString());
            }
        }, {
            key: 'error',
            value: function error(_error) {
                console.error(_format, _error.toString());
            }
        }]);

        return Logger;
    }();

    return new Logger(format);
};

exports.default = Logger;