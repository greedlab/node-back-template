'use strict';

var _bluebird = require('bluebird');

var _koaPassport = require('koa-passport');

var _koaPassport2 = _interopRequireDefault(_koaPassport);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _passportLocal = require('passport-local');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_koaPassport2.default.serializeUser(function (user, done) {
    done(null, user.id);
}); /**
     * Created by Bell on 16/8/10.
     */

_koaPassport2.default.deserializeUser(function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(id, done) {
        var user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _user2.default.findById(id, '-password');

                    case 3:
                        user = _context.sent;

                        done(null, user);
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);

                        done(_context.t0);

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 7]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

_koaPassport2.default.use('local', new _passportLocal.Strategy({
    usernameField: 'username',
    passwordField: 'password'
}, function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(username, password, done) {
        var user, isMatch;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _user2.default.findOne({ username: username });

                    case 3:
                        user = _context2.sent;

                        if (user) {
                            _context2.next = 6;
                            break;
                        }

                        return _context2.abrupt('return', done(null, false));

                    case 6:
                        _context2.prev = 6;
                        _context2.next = 9;
                        return user.validatePassword(password);

                    case 9:
                        isMatch = _context2.sent;

                        if (isMatch) {
                            _context2.next = 12;
                            break;
                        }

                        return _context2.abrupt('return', done(null, false));

                    case 12:
                        done(null, user);
                        _context2.next = 18;
                        break;

                    case 15:
                        _context2.prev = 15;
                        _context2.t0 = _context2['catch'](6);

                        done(_context2.t0);

                    case 18:
                        _context2.next = 23;
                        break;

                    case 20:
                        _context2.prev = 20;
                        _context2.t1 = _context2['catch'](0);
                        return _context2.abrupt('return', done(_context2.t1));

                    case 23:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 20], [6, 15]]);
    }));

    return function (_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}()));
//# sourceMappingURL=passport.js.map
