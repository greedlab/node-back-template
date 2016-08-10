/**
 * Created by Bell on 16/8/10.
 */

export async function index(ctx) {
    let data = {
        title: 'Book',
        content: 'Test',
        url: 'test'
    };
    ctx.status = 200;
    ctx.body = data;
}