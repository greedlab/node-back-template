'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _auth = require('../utils/auth');

var _user = require('../controllers/user');

var controller = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Created by Bell on 16/8/10.
 */

var Router = require('koa-router');

var base_url = '/user';
var router = new Router({ prefix: base_url });

router.post('/list', _auth.ensureUser, controller.list).post('/register', controller.register).post('/login', controller.login).post('/logout', _auth.ensureUser, controller.logout);

exports.default = {
    baseUrl: base_url,
    router: router
};
//# sourceMappingURL=user.js.map
