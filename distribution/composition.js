"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Composition = function Composition(functions) {

    var _functions = void 0;
    var _fallback = void 0;

    var Composition = function () {
        function Composition(functions) {
            _classCallCheck(this, Composition);

            _functions = functions;
        }

        _createClass(Composition, [{
            key: "withFallback",
            value: function withFallback(fallback) {
                _fallback = fallback;
                return this;
            }
        }, {
            key: "compose",
            value: function compose() {
                return functions.reverse().reduce(function (composition, fn) {
                    var callback = _fallback ? _guard(composition) : composition;

                    return function () {
                        return fn(callback);
                    };
                });
            }
        }]);

        return Composition;
    }();

    // Guard function calls fallback instead of callback if error was passed


    function _guard(callback) {
        return function (error) {
            if (error) return _fallback(error);

            return callback();
        };
    }

    return new Composition(functions);
};

exports.default = Composition;