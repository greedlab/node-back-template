'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = undefined;

var _bluebird = require('bluebird');

/**
 * Created by Bell on 16/8/10.
 */

var index = exports.index = function () {
    var _ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        ctx.body = {
                            home: 'home'
                        };

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function index(_x) {
        return _ref.apply(this, arguments);
    };
}();
//# sourceMappingURL=home.js.map
