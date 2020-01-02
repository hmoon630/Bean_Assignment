import * as dotenv from 'dotenv';
dotenv.config()

import * as Koa from 'koa';
import * as helmet from 'koa-helmet'; 
import * as cors from '@koa/cors';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';

import { router } from './router';
import { sequelize } from 'models';
sequelize.sync();

const app = new Koa();
const port = process.env.PORT || 4000;

app.use(helmet())
    .use(cors())
    .use(logger())
    .use(bodyParser())
    .use(router.routes()).use(router.allowedMethods())

app.listen(port, () => {
    console.log(`Bean API Server Started.. with port ${port}`);
})
