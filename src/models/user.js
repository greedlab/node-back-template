/**
 * Created by Bell on 16/8/10.
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import jwt from 'jsonwebtoken';
import Promise from 'bluebird';

Promise.promisifyAll(require("mongoose"));
Promise.promisifyAll(require("bcrypt"));

const User = new mongoose.Schema({
    type: { type: String, default: 'User' },
    name: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

User.pre('save', function preSave(next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err);
            } else {
                resolve(salt);
            }
        });
    })
        .then(salt => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    throw new Error(err);
                }
                user.password = hash;
                next(null);
            });
        })
        .catch(err => next(err));
});

User.methods.validatePassword = function validatePassword(password) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                reject(err);
            } else {
                resolve(isMatch);
            }
        });
    });
};

User.methods.generateToken = function generateToken() {
    const user = this;
    return jwt.sign({ id: user.id }, config.token);
};

export default mongoose.model('user', User);
