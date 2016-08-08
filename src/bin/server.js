
const koa = require('koa');
const app = new koa();
const logger = require('koa-logger');
const favicon = require('koa-favicon');
const serve = require('koa-static');
const path = require('path');

import config from '../config/index';
import index from '../routes/index';
import test from '../routes/test';

// router

app
    .use(index.router.routes())
    .use(index.router.allowedMethods())
    .use(test.router.routes())
    .use(test.router.allowedMethods());

// static

app.use(serve(path.join(__dirname,'../assets')));

// logger

app.use(logger());

// favicon

app.use(favicon(path.join(__dirname,'../assets/favicon.ico')));

// listen

app.listen(process.env.PORT || config.port);
