'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureUser = undefined;

var _bluebird = require('bluebird');

/**
 * ensure user login successfully
 *
 * @param ctx ctx.request.header.authorization = "Bearer <token>"
 * @param next
 * @returns {*}
 */
var ensureUser = exports.ensureUser = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var token, decoded, user, existed;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        token = getToken(ctx);


                        if (!token) {
                            ctx.throw(401);
                        }

                        decoded = null;

                        try {
                            decoded = (0, _jsonwebtoken.verify)(token, _config2.default.token);
                        } catch (err) {
                            ctx.throw(401);
                        }

                        _context.next = 6;
                        return _user2.default.findById(decoded.id, '-password');

                    case 6:
                        user = _context.sent;

                        if (!user) {
                            ctx.throw(401);
                        }
                        _context.next = 10;
                        return unvalid_token.existed(token);

                    case 10:
                        existed = _context.sent;

                        if (existed) {
                            ctx.throw(401);
                        }
                        return _context.abrupt('return', next());

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function ensureUser(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

exports.getToken = getToken;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _unvalidToken = require('../utils/unvalid-token');

var unvalid_token = _interopRequireWildcard(_unvalidToken);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * get token from request header
 *
 * @param ctx ctx.request.header.authorization = "Bearer <token>"
 * @returns {*}
 */
/**
 * Created by Bell on 16/8/10.
 */

function getToken(ctx) {
    var header = ctx.request.header.authorization;
    if (!header) {
        return null;
    }
    var parts = header.split(' ');
    if (parts.length !== 2) {
        return null;
    }
    var scheme = parts[0];
    var token = parts[1];
    if (/^Bearer$/i.test(scheme)) {
        return token;
    }
    return null;
}
//# sourceMappingURL=auth.js.map
