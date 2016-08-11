'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _home = require('../controllers/home');

var controller = _interopRequireWildcard(_home);

var _auth = require('../utils/auth');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Created by Bell on 16/6/16.
 */

var Router = require('koa-router');

var base_url = '/';
var router = new Router({ prefix: base_url });

router.get('/', _auth.ensureUser, controller.index);

exports.default = {
    baseUrl: base_url,
    router: router
};
//# sourceMappingURL=home.js.map
