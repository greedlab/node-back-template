/**
 * Created by Bell on 16/6/16.
 */

const Router = require('koa-router');

import * as controller from '../controllers/index';

let base_url = '/';
let router = new Router({ prefix: base_url });

router
    .get('/', async(ctx, next) => {
        await controller.index(ctx);
        return next();
    })
    .post('/', async(ctx, next) => {
        await controller.index(ctx);
        return next();
    });

export default {
    baseUrl: base_url,
    router: router
};
