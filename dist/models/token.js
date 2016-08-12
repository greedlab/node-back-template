'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isTokenExisted = exports.delToken = exports.saveToken = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var saveToken = exports.saveToken = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(token) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return client.setAsync(token, 1);

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function saveToken(_x) {
        return _ref.apply(this, arguments);
    };
}();

var delToken = exports.delToken = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(token) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return client.delAsync(token);

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function delToken(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

var isTokenExisted = exports.isTokenExisted = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(token) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return client.getAsync(token);

                    case 3:
                        result = _context3.sent;

                        if (!result) {
                            _context3.next = 8;
                            break;
                        }

                        return _context3.abrupt('return', true);

                    case 8:
                        return _context3.abrupt('return', false);

                    case 9:
                        _context3.next = 15;
                        break;

                    case 11:
                        _context3.prev = 11;
                        _context3.t0 = _context3['catch'](0);

                        console.error(_context3.t0);
                        return _context3.abrupt('return', false);

                    case 15:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[0, 11]]);
    }));

    return function isTokenExisted(_x3) {
        return _ref3.apply(this, arguments);
    };
}();

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * unvalid token
 *
 * Created by Bell on 16/8/12.
 */

var client = _redis2.default.createClient();

_bluebird2.default.promisifyAll(_redis2.default.RedisClient.prototype);
//# sourceMappingURL=token.js.map
