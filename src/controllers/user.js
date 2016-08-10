/**
 * Created by Bell on 16/8/10.
 */

import passport from 'koa-passport';
import User from '../models/user';

export async function register(ctx, next) {
    const user = new User(ctx.request.body);
    try {
        await user.save();
    } catch (err) {
        ctx.throw(422, err.message);
    }

    const token = user.generateToken();
    const response = user.toJSON();
    delete response.password;
    ctx.body = {
        token,
        user: response
    };
    if (next) {
        return next();
    }
}

export async function login(ctx, next) {
    let options = {
        session: false,
        successRedirect: '/booklist',
        failureRedirect: '/login'
    };
    return passport.authenticate('local', options, (user) => {
        if (!user) {
            ctx.throw(401);
        }
        const token = user.generateToken();
        const response = user.toJSON();
        delete response.password;
        ctx.body = {
            token,
            user: response
        };
    })(ctx, next);
}

export async function updateUser(ctx, next) {
    const user = ctx.body.user;
    Object.assign(user, ctx.request.body.user);
    await user.save();
    ctx.body = {
        user
    };
}

