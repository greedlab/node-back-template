'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logout = exports.login = exports.register = exports.list = undefined;

var _bluebird = require('bluebird');

/**
 * list users
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST localhost:4002/user/list
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
/**
 * Created by Bell on 16/8/10.
 */

var list = exports.list = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var users;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _user2.default.find();

                    case 3:
                        users = _context.sent;

                        if (!users) {
                            ctx.throw(404);
                        }
                        ctx.body = {
                            users: users
                        };
                        _context.next = 12;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](0);

                        if (_context.t0 === 404 || _context.t0.name === 'CastError') {
                            ctx.throw(404);
                        }
                        ctx.throw(500);

                    case 12:
                        if (!next) {
                            _context.next = 14;
                            break;
                        }

                        return _context.abrupt('return', next());

                    case 14:
                        ;

                    case 15:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 8]]);
    }));

    return function list(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * register
 *
 * @example curl -H "Content-Type: application/json" -X POST -d '{ "username": "bell", "password": "secretpasas" }' localhost:4002/user/register
 * @param ctx
 * @param next
 * @returns {*}
 */


var register = exports.register = function () {
    var _ref2 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var user, token, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        console.log(ctx.request.body);
                        console.log(ctx.req.body);
                        user = new _user2.default(ctx.request.body);
                        _context2.prev = 3;
                        _context2.next = 6;
                        return user.save();

                    case 6:
                        _context2.next = 11;
                        break;

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](3);

                        ctx.throw(422, _context2.t0.message);

                    case 11:
                        token = user.generateToken();
                        response = user.toJSON();

                        delete response.password;
                        ctx.body = {
                            token: token,
                            user: response
                        };

                        if (!next) {
                            _context2.next = 17;
                            break;
                        }

                        return _context2.abrupt('return', next());

                    case 17:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[3, 8]]);
    }));

    return function register(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * login
 *
 * @example curl -H "Content-Type: application/json" -X POST -d '{ "username": "bell", "password": "secretpasas" }' localhost:4002/user/login
 * @param ctx
 * @param next
 * @returns {*}
 */


var login = exports.login = function () {
    var _ref3 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3(ctx, next) {
        var options;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        options = {
                            session: false
                        };
                        return _context3.abrupt('return', _koaPassport2.default.authenticate('local', options, function (user) {
                            if (!user) {
                                ctx.throw(401);
                            }
                            var token = user.generateToken();
                            var response = user.toJSON();
                            delete response.password;
                            ctx.body = {
                                token: token,
                                user: response
                            };
                        })(ctx, next));

                    case 2:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function login(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

/**
 * logout
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST -d 'id=57ac5a7daded43ff231b648d'  localhost:4002/user/logout
 * @param ctx
 * @param next
 * @returns {*}
 */


var logout = exports.logout = function () {
    var _ref4 = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(ctx, next) {
        var token;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        try {
                            token = (0, _auth.getToken)(ctx);

                            if (token) {
                                (0, _unvalidToken.addToken)(token);
                            }
                        } catch (err) {
                            ctx.throw(422, err.message);
                        }
                        ctx.status = 200;
                        ctx.body = {
                            success: true
                        };

                    case 3:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function logout(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var _koaPassport = require('koa-passport');

var _koaPassport2 = _interopRequireDefault(_koaPassport);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _unvalidToken = require('../utils/unvalid-token');

var _auth = require('../utils/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=user.js.map
