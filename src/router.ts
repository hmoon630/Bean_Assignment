import * as Koa from 'koa';
import * as Router from 'koa-router';

const router = new Router();

router.get('/', (ctx : Koa.Context) => {
    ctx.body = "Hello World!"
})

export { router };