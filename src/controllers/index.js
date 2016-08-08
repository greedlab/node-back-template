
const template = require('art-template');
const path = require('path');

export async function index(ctx) {
    let data = {
        title: 'Index',
        content: 'Test',
        url: 'test'
    };
    var html = template(path.join(__dirname,'../views/index'), data);
    ctx.body = html;
}
