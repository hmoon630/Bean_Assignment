import * as Koa from 'koa';

export const errorHandler =  () => {
    return async function errorHandler(ctx: Koa.Context, next: () => Promise<any>) {
        try {
            await next();
        } catch (error) {
            ctx.status = error.statusCode || 500;
            ctx.body = {
                error : error.code,
                message : error.message
            }
        }
    }
}