'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Promise from 'bluebird';
/**
 * Created by Bell on 16/8/10.
 */

_mongoose2.default.Promise = global.Promise;

var User = new _mongoose2.default.Schema({
    type: { type: String, default: 'User' },
    name: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

User.pre('save', function preSave(next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }

    new Promise(function (resolve, reject) {
        _bcrypt2.default.genSalt(10, function (err, salt) {
            if (err) {
                reject(err);
            } else {
                resolve(salt);
            }
        });
    }).then(function (salt) {
        _bcrypt2.default.hash(user.password, salt, function (err, hash) {
            if (err) {
                throw new Error(err);
            }
            user.password = hash;
            next(null);
        });
    }).catch(function (err) {
        return next(err);
    });
});

User.methods.validatePassword = function validatePassword(password) {
    var user = this;
    return new Promise(function (resolve, reject) {
        _bcrypt2.default.compare(password, user.password, function (err, isMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(isMatch);
            }
        });
    });
};

User.methods.generateToken = function generateToken() {
    var user = this;
    return _jsonwebtoken2.default.sign({ id: user.id }, _config2.default.token);
};

exports.default = _mongoose2.default.model('user', User);
//# sourceMappingURL=user.js.map
