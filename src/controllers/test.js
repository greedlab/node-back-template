/**
 * Created by Bell on 16/6/16.
 */

const template = require('art-template');
const path = require('path');
const debug = require('debug')('node-front-template:controllers:test');

import request from '../utils/request';
import config from '../config/github';

export async function index(ctx) {
    try {
        let url = config.domain + '/repos/greedlab/node-front-template';
        let option = {
            headers: {
                'User-Agent': config.useragent,
                'Accept': config.accept
            }
        };
        let response = await request(url, option);
        ctx.body = template(path.join(__dirname, '../views/test'), JSON.parse(response));
    } catch (err) {
        console.log(err);
    }
}
