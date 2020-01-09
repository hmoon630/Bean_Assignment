import * as dotenv from 'dotenv';
dotenv.config();

import * as cors from '@koa/cors';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';
import * as logger from 'koa-logger';

import { errorHandler } from 'middlewares/error-handler';
import { sequelize } from 'models';
import { router } from './router';
sequelize.sync();

const app = new Koa();
const port = process.env.PORT || 4000;

app.use(helmet())
    .use(cors())
    .use(logger())
    .use(errorHandler())
    .use(bodyParser())
    .use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log(`Bean API Server Started.. with port ${port}`);
});
