/**
 * Created by Bell on 16/8/10.
 */

const Router = require('koa-router');

import * as controller from '../controllers/user';

let base_url = '/user';
let router = new Router({ prefix: base_url });

router
    .post('/register', controller.register)
    .post('/login', controller.login);

export default {
    baseUrl: base_url,
    router: router
};
