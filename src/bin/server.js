
import koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import passport from 'koa-passport';

import config from '../config';
import home from '../routes/home';
import user from '../routes/user';

const app = new koa();

// router

app
    .use(home.router.routes())
    .use(home.router.allowedMethods())
    .use(user.router.routes())
    .use(user.router.allowedMethods());

// logger

app.use(logger());

// mongodb

mongoose.connect(config.database);

// bodyParser

app.use(bodyParser());

// passport

require('../config/passport');
app.use(passport.initialize());

// listen

app.listen(config.port);
